const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../squema/user');

router.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if(!username || !name || !password) {
        return res.status(400).json(jsonResponse(400, {
            error: "Fields are required",
        })
        );
    }

    //Crear el usuario en la base de datos
    const user = new User({
        username,
        name,
        password
    });

        try {
        await user.save();
        res.status(200).json(jsonResponse(200, {
            message: "User created successfully",
        }));
    } catch (err) {
        console.error('Error al guardar usuario:', err);
        if (err.code === 11000) {
            return res.status(409).json(jsonResponse(409, {
                error: "Username already exists"
            }));
        }
        res.status(500).json(jsonResponse(500, {
            error: "Error creating user",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        }));
    }
});

module.exports = router;