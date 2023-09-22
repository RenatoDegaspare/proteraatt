import bcrypt from "bcrypt";
import usuarioSchema from "../models/usuarioSchema.js";

const getAll = async (req, res) => {
    usuarioSchema.find(function (err, usuarios) {
        if (err) {
            res.status(500).json({
                statusCode: 500,
                message: err.message
            });
        }
        res.status(200).json({
            statusCode: 200,
            data: {
                usuarios
            }
        })
    })
}

const criarUsuario = async (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    try {

        console.log(req.body);

        const novoUsuario = new usuarioSchema(req.body);

        const usuarioSalvo = await novoUsuario.save();

        res.status(201).json({
            statusCode: 201,
            message: "Usuário criado com sucesso!",
            data: {
                usuarioSalvo
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};

const updateUsuario = async (req, res) => {
    try {
      const updatedUsuario = await usuarioSchema.
      findByIdAndUpdate(req.params.id,req.body);
      res.status(200).send({
        massage: "Usuário atualizado com sucesso",
        statusCode: 200,
        data: updatedUsuario,
    });
    } catch (error) {
        res.status(500).send({message: error.message});
        console.logo(error);
    }
};      
const deleteUsuario = async (req, res) => {
    try {
        await usuarioSchema.findByIdAndDelete(req.params.id);
        res.status(200).send({
        message: "Usuario deletado com sucesso",
        statusCode: 200,
        });
    } catch (error) {
        console.error(error);
    }
};
export default {
    getAll,
    criarUsuario,
    updateUsuario,
    deleteUsuario,
};
