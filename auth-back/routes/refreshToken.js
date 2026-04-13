const { verify } = require('jsonwebtoken');
const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { jsonResponse } = require('../lib/jsonResponse');
const Token = require('../schema/token');
const { verifyRefreshToken } = require('../auth/verifyTokens');

const router = require('express').Router();

router.post('/', async (req, res) => {

    const refresToken = getTokenFromHeader(req.headers);

    if(refresToken) {
        try{
            const found = await Token.findOne({ token: refresToken });
            if(!found) {
                return res
                .status(401)
                .json(jsonResponse(401, { error: "Unauthorized" }));
            }

            const payload = verifyRefreshToken(refresToken);
            if(payload){
                const accessToken = generateAccessToken(payload);
                return res
                .status(200)
                .json(jsonResponse(200, { accessToken }));
            } else {
                return res
                .status(401)
                .json(jsonResponse(401, { error: "Unauthorized" }));
            }

        } catch(error) {
            return res
            .status(500)
            .json(jsonResponse(500, { error: "Internal server error" }));
        }
    }
    else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
    }
    res.send("refresh token");
});


module.exports = router;