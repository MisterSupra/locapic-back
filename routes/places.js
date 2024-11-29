var express = require('express');
var router = express.Router();


require('../models/connection');
const User = require('../models/users');


router.post('/', async (req, res) => {
    if(req.body.name !== ''){
        const newPlace = new User({
            nickname: req.body.nickname,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
    
        await newPlace.save();
        res.json({ result: true });
    }else{
        res.json({result: false});
    }
});

router.get('/:nickname', async (req, res) => {
    const allPlace = await User.find({ nickname: req.params.nickname });
    res.json({ result: true, places: allPlace });
});


router.delete('/', async (req, res) => {
    await User.deleteOne({ nickname: req.body.nickname, name: req.body.name })
    res.json({ result: true })
});



module.exports = router;
