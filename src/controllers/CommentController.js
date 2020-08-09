const { Author, Post, Comment } = require("../models");


const response = {
    data: [],
    message: "Your Message",
    status: "success",
};


class commentController {
    static async getcomment(req, res) {
        try {
            const commentRes = await Comment.findAll();
            response.data = commentRes;
            response.status = "OK";
            response.message = "Success get all";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getcommentById(req, res) {
        try {
            const commentRes = await Comment.findByPk(req.params.id, {
                include: [
                    { model: Comment }
                ]
            });
            if (!commentRes)
                throw Error('data for params id null')
            response.data = commentRes;
            response.message = "Success get comment by id";
            response.status = "OK";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.message = "error get data";
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }
    }



    static async deletecommentById(req, res) {
        try {
            const commentRes = await Comment.findByPk(req.body.id);
            if (!commentRes)
                throw Error('delete data for params id null')
            await comment.destroy({ where: { id: req.body.id } });
            response.data = req.body.id;
            response.message = "Succes delete data";
            response.status = "OK";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.message = "error delete data";
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }
    }

    static async updatecomment(req, res) {
        try {
            await Comment.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            response.status = "OK";
            response.message = "Updated data by PATCH success";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }

    static async createcomment(req, res) {
        try {
            await Comment.create(req.body);
            response.data = req.body;
            response.message = "create data success";
            response.status = "OK";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "ERROR";
            response.message = error.message;
            res.status(400).json(response);
        }

    }


}

module.exports = CommentController;