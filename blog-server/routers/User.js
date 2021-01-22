const express = require("express");
const UserController = require("../controllers/User");
const multiPart = require("connect-multiparty")

const md_uploadAvatar = multiPart({ uploadDir: "./uploads/avatar" });
const Authenticated = require('../middleware/authenticated');

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [Authenticated.ensureAuth], UserController.getUsers);
api.get("/users-active", [Authenticated.ensureAuth], UserController.getUsersActive);
api.put("/upload-avatar/:id", [Authenticated.ensureAuth, md_uploadAvatar], UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar)
api.put("/update-user/:id", [Authenticated.ensureAuth], UserController.updateUser);

module.exports = api;