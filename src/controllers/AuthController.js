require('dotenv').config()
const { Author } = require("../models");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const Email = require("./../helpers/sendEmail");
const Webpage = require("./../helpers/pdf");

const Bull = require('bull');
const sendMailQueue = new Bull('sendMail');


const response = {
    data: [],
    message: "Your Message",
    status: "success",
};


class AuthController {
    static async loginAuthor(req, res, next) {
        passport.authenticate('login', async(err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error(err.message)
                    return next(error.message);
                }
                req.login(user, { session: false }, async(error) => {
                    if (error) return next(error.message)
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, process.env.PRIVATE_KEY);
                    response.status = "ok";
                    response.data = {
                        "token": token
                    };
                    response.message = "success login";
                    return res.status(200).json(response);
                });
            } catch (error) {
                return next(error.message);
            }
        })(req, res, next);
    }

    static async createAuthor(req, res) {
        try {
            const createResult = await Author.create(req.body);
            const url = 'http://localhost:3000/email';
            const bufferPdf = await Webpage.generatePDF(url);

            const dataEmail = {
                username: createResult.dataValues.username,
                email: createResult.dataValues.email
            };
            const options = {
                delay: 5000, // 1 min in ms
            };
            sendMailQueue.add(dataEmail, options);

            sendMailQueue.process(async job => {
                return await Email.sendEmail(
                    dataEmail,
                    "Welcome to our Amazing App",
                    "welcome.pdf",
                    bufferPdf
                );
            });


            response.data = dataEmail;
            response.message = "Register author success";
            res.status(200).json(response);
        } catch (error) {
            response.data = {}
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }
}

module.exports = AuthController;