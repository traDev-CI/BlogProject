const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET_KEY = "18M978O23jhg87ol9536yhdyFHT761111hmnvLLs1";

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: " The request does not have the authentication header" });
    }
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        var payload = jwt.decode(token, SECRET_KEY);
        if (payload.exp <= moment.unix()) {
            return res.status(404).send({ message: "The token has expired" });
        }
    } catch (ex) {
        // console.log(ex);
        return res.status(404).send({ message: "The token is invalid" });
    }
    req.user = payload;
    next();
}