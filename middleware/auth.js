const jwt = require('jsonwebtoken')
const config = require('../config/config')


const verifytoken = async (req, res, next) => {

    const arr = req.headers.authorization.split(' ')[1];
    if (arr == undefined) {
        res.status(400).send({ success: false, msg: "require token for authenticated" })
            }
            else{
                        try {
           
            const decode =jwt.verify(arr,config.secret_jwt);
            req.user= decode;
         
            res.send("Token has been authorized");s
        }
        catch (e) {
            // console.log('auth err  ',e)
            res.status(401).send({ error: 'invalid token.' })
        }
        return next();
    }
}

module.exports = verifytoken;