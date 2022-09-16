const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { UserModel } = require("../models/user.model");

const login = async (req, res) => {
    try {
        // Authentication
        let user = await UserModel.findOne({ email: req.body.email });

        console.log(req.body.email);
        console.log(req.body.password);

        if (user && bcrypt.compareSync(req.body.password, user.password)) {

            const authUser = { id : user._id }

            const accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET)
            // to get random secret key
            // node
            // require('crypto').randomBytes(64).toString('hex')

            const outUser = {
                _id: user._id,
                full_name: user.full_name,
                email: user.email
            }

            res.status(200).json({
                status: "AUTHORIZED",
                token: accessToken,
                user: outUser
            })
        } else {
            res.status(401).json({
                status: "UNAUTHORIZED"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({
            status: "UNAUTHORIZED - SERVER ISSUE"
        })
    }
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
}

module.exports = {
    login,
    authenticateToken
}
