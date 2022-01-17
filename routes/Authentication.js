require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
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

    const connection = typeorm.getConnection();
   
    var { name, email, password } = req.body;
    password = await bcrypt.hash(password, 10);

   const register = await connection.getRepository(posts_table)
    .createQueryBuilder()
    .insert()
    .values({ name, email, password }).execute();
      res.status(200).send({
          register,
          "Message": "Registered Successfully"
      })
    
})

router.post('/userLogin', async (req, res) => {
    const connection = typeorm.getConnection()

    var result = await connection.getRepository(posts_table)

    const accessToken = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.JWT_SECRET, async (err, token) => {
        // console.log(err);
        console.log(token);
        // accToken = token
        // console.log(accToken)

        // const passMatch = await bcrypt.compare(req.body.password, hash);
        var userLogin = await result.findOne({ email: req.body.email});
        var pass = await bcrypt.compare(req.body.password, userLogin.password)
        console.log("Data ", userLogin);

        // res.status(401).send()    
        if (userLogin === undefined || pass === false) {
            res.send({
                "Message": "user Not found"
            })
        } else {

            res.status(200).json({
                userLogin,
                accessToken: token
            })
        }
    });
})


module.exports = router;