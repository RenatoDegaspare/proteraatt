import express from "express";
const router = express.Router();

import controller from "../controllers/usuarioControllers.js";
import authControllers from "../controllers/authControllers.js";
import usuarioControllers from "../controllers/usuarioControllers.js";

router.get("/", authControllers.verificarToken, controller.getAll);
router.post("/criar", usuarioControllers.criarUsuario);
router.patch("/:id", usuarioControllers.updateUsuario);
router.delete("/:id", usuarioControllers.deleteUsuario);
router.post("/login", authControllers.login);

export default router;