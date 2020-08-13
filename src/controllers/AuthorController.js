const { Author, Post, Comment } = require("../models");

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
        } catch (error) {
            response.data = undefined
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getAuthorById(req, res) {
        try {
            const authorRes = await Author.findByPk(req.params.id, {
                include: [
                    { model: Post },
                    { model: Comment }
                ]
            });
            if (!authorRes)
                throw Error('data for params id null')
            response.data = authorRes;
            response.message = "Succes get data";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.message = "error get data";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
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
            response.data = undefined
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
            response.data = undefined
            response.status = "error update by PATCH";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }

}

module.exports = AuthorController;