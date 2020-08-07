const { Author } = require("../models");
const { sequelize } = require('../models/author.js');

const response = {
    data: [],
    message: "Your Message",
    status: "success",
};


class AuthorController {
    static async getAuthor(req, res) {
        try {
            const authorRes = await Author.findAll();
            response.data = authorRes;
            response.message = "Succes get data";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }

    static async getAuthorById(req, res) {
        try {
            const authorRes = await Author.findByPk(req.params.id);
            if (!authorRes)
                throw Error('data for params id null')
            response.data = authorRes;
            response.message = "Succes get data";
            res.status(200).json(response);
        } catch (error) {
            response.message = "error get data";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }


    static todoDelete = async(todoId) => {
        try {
            await Todo.destroy({
                where: {
                    id: todoId
                }
            }).then((val) => {
                console.log('Berhasil hapus data')
            });
        } catch (err) {
            console.log('Kesalahan, data gagal di hapus')
        }
    }


    static async deleteAuthorById(req, res) {
        try {
            const authorRes = await Author.findByPk(req.body.id);
            if (!authorRes)
                throw Error('delete data for params id null')
            await Author.destroy({ where: { id: req.body.id } });
            response.data = req.body.id;
            response.message = "Succes delete data";
            res.status(200).json(response);
        } catch (error) {
            response.message = "error delete data";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }

    static async updateAuthor(req, res) {
        try {
            await Author.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            console.log(req.body)
            response.message = "Updated data by PATCH success";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.data = {};
            response.status = "error update by PATCH";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }

    static async createAuthor(req, res) {
        try {
            await Author.create(req.body);
            response.data = req.body;
            console.log(req.body)
            response.message = "create data success";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.data = {};
            response.status = "error create data";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }


}

module.exports = AuthorController;