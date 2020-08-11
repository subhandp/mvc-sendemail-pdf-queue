const { Author, Post, Comment } = require("../models");
const { uploadCloudinary } = require("./Upload");



const response = {
    data: [],
    message: "Your Message",
    status: "success",
};


class PostController {
    static async getPost(req, res) {
        try {
            const postRes = await Post.findAll();
            response.data = postRes;
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

    static async getPostById(req, res) {
        try {
            const postRes = await Post.findByPk(req.params.id, {
                include: [
                    { model: Comment }
                ]
            });
            if (!postRes)
                throw Error('data for params id null')
            response.data = postRes;
            response.message = "Success get post by id";
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



    static async deletePostById(req, res) {
        try {
            const postRes = await Post.findByPk(req.body.id);
            if (!postRes)
                throw Error('delete data for params id null')
            await Post.destroy({ where: { id: req.body.id } });
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

    static async updatePost(req, res) {
        try {
            await Post.update(req.body, {
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

    static async createPost(req, res) {
        try {
            const dataImage = await uploadCloudinary(req, res);
            const dataCreate = {...req.body, ...dataImage };
            await Post.create(dataCreate);
            response.data = dataCreate;
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

module.exports = PostController;