const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    
        if(!username || !password) {
            return res.status(400).json(jsonResponse(400, {
                error: "Fields are required",
            })
            );
        }
    
        //Autenticar el usuario en la base de datos
        const accessToken = "acces_token";
        const refreshToken = "refresh_token";
        const user = {
            id: '1',
            name: 'John Doe',
            username: 'johndoe',
        };
        res.status(200).json(jsonResponse(200, {
            user, accessToken, refreshToken,
            message: "User authenticated successfully",
        }));
});

module.exports = router;