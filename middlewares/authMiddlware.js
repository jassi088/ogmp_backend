const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            if (req?.headers?.authorization.startsWith('Bearer')) {
                const token = req?.headers?.authorization.split(' ')[1];
                if (token) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                    if (decodedToken) {
                        req.body.userId = decodedToken.userId;
                        next();
                    }
                }
            } else {
                res.send({
                    success: false,
                    message: 'No token attached to the request headers',
                });
            }
        } else {
            res.send({
                success: false,
                message: 'No authorization',
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { auth };