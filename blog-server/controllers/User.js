const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const { exists } = require("../models/User");

function signUp(req, res) {
    const user = new User();
    const { name, lastname, email, password, repeatPassword } = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;

    if (!password || !repeatPassword) {
        res.status(404).send({ message: " Passwords are required." });
    } else {
        if (password != repeatPassword) {
            res.status(404).send({ message: "Passwords do not match" });
        } else {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({ message: "Failed to encrypt password" });
                } else {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "User already exists." });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: " Failed to create user." });
                            } else {
                                res.status(200).send({ user: userStored });
                            }
                        }
                    });
                }
            });
            //res.status(200).send({ message: "Todo esta correcto" })
        }
    }
}

function signIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Username does not exist" });
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: "Server error" });
                    } else if (!check) {
                        res.status(404).send({ message: "Email or password are incorrect" });
                    } else {
                        if (!userStored.active) {
                            res.status(200).send({ code: 200, message: "The user has not been activated, contact the administrator" });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                })
            }
        }
    })
}

function getUsers(req, res) {
    User.find().then(users => {
        if (!users) {
            res.status(404).send({ message: "No user has been found, please report it to the Administrator" });
        } else {
            res.status(200).send({ users });
        }
    });
}

function getUsersActive(req, res) {
    const query = req.query;
    User.find({ active: query.active }).then(users => {
        if (!users) {
            res.status(404).send({ message: "No user has been found, please report it to the Administrator" });
        } else {
            res.status(200).send({ users });
        }
    });
}

function uploadAvatar(req, res) {
    const params = req.params;
    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!userData) {
                res.status(404).send({ message: "User not found" });
            } else {
                let user = userData;
                if (req.files) {
                    console.log(req.files);
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\").join("/");
                    let fileSplit2 = fileSplit.split("/");
                    let fileName = fileSplit2[2];
                    let extSplit = fileName.split(".")
                    let fileExt = extSplit[1];
                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400).send({ message: "The image extension is not correct. (Allowed extensions: .png and .jpg)" });
                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
                            if (err) {
                                res.status(500).send({ message: "Server error" });
                            } else {
                                if (!userResult) {
                                    res.status(404).send({ message: "The user is not in the database" });
                                } else {
                                    res.status(200).send({ avatarName: fileName });
                                }
                            }
                        })
                    }
                } else {
                    res.status(500).send({ message: "ERROR" });
                }
            }
        }
    })

}

function getAvatar(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;
    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: "The avatar to look for does not exist" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });

}

function updateUser(req, res) {
    const userData = req.body;
    const params = req.params;

    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: " No user found." });
            } else {
                res.status(200).send({ message: "User updated successfully" });
            }
        }
    })


}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    uploadAvatar,
    getAvatar,
    updateUser
}