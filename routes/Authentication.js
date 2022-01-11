const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var typeorm = require('typeorm');
const connection = require('../server')
const Post = require('../post')
const bcrypt = require('bcryptjs');
const posts_table = "posts";

router.use(bodyParser.json())


router.get('/login', async (req, res) => {
    const connection = typeorm.getConnection();

    var result = await connection.getRepository(posts_table)
        .createQueryBuilder().getMany();
    res.status(200).json({
        "Message": "Working",
        result
    })
})

router.post('/posts', async (req, res) => {
    // const hashPass 
    const connection = typeorm.getConnection();
    const { name, email, password = await bcrypt.hash(req.body.password, 12)} = req.body;

    await connection.getRepository(posts_table)
        .createQueryBuilder()
        .insert()
        .values({ name, email, password }).execute();
})

router.post('/userLogin', async (req, res) => {
    // const hashPass 
    const connection = typeorm.getConnection();
    const { email, password } = req.body;

    // await connection.getRepository(posts_table)
    //     .createQueryBuilder()
    //     .insert()
    //     .values({ name, email, password }).execute();
      
        var result = await connection.getRepository(posts_table)
        .createQueryBuilder()
    .where("user.email = :email", { email: req.body.email})
    res.status(200).json({
        "Message": "Working",
        result
    })
})

module.exports = router;