const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../squema/user');
const getUserInfo = require('../lib/getUserInfo');

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    
        if(!username || !password) {
            return res.status(400).json(jsonResponse(400, {
                error: "Fields are required",
            })
            );
        }

        const user =  await User.findOne({ username });

        if(user){
            const correctPassword = await user.comparePassword(password);
            if(correctPassword){
                //autenticar usuario
                const accessToken = user.createAccessToken(); 
                const refreshToken = await user.refreshAccessToken(); 
                
                res
                .status(200)
                .json(jsonResponse(200, {
                    user: getUserInfo(user), 
                    accessToken, 
                    refreshToken,
                    message: "User authenticated successfully",
                }));
            }else{
                res.status(401).json(jsonResponse(401, {
                error: "Invalid username or password",
            }));
            }
        } else{
            res.status(401).json(jsonResponse(401, {
                error: "Invalid username or password",
            }));
        }
    
        //Autenticar el usuario en la base de datos
        /*const accessToken = "acces_token";
        const refreshToken = "refresh_token";
        const user = {
            id: '1',
            name: 'John Doe',
            username: 'johndoe',
        };*/
        
});

module.exports = router;