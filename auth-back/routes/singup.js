const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("singup");
});

module.exports = router;