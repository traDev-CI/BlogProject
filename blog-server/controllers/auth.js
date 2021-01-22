const jwt = require('../services/jwt');
const moment = require('moment');
const user = require('../models/User');

function checkExpireToken(token) {
    const { exp } = jwt.decodeToken(token);
    const currentDate = moment().unix();
    // Si el current es mayor al exp significa que el token a caducado
    if (currentDate > exp) {
        return true;
    }
    return false;
}


function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;
    const isTokenExpired = checkExpireToken(refreshToken);
    if (isTokenExpired) {
        res.status(404).send({ message: "El refreshToken ha expirado" });
    } else {
        const { id } = jwt.decodeToken(refreshToken);
        user.findOne({ _id: id }, (err, userStore) => {
            if (err) {
                res.status(500).send({ message: "Error del servidor" });
            } else {
                if (!userStore) {
                    res.status(404).send({ message: "Usuario no encontrado" });
                } else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStore),
                        refreshToken: refreshToken

                    })
                }
            }
        });
    }
}

module.exports = {
    refreshAccessToken
}