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
    const rounds = 10   
    const { name, email, password } = req.body;
    bcrypt.hash(password, rounds, async(err, hash) => {
        if (err) {
          console.error(err)
          return
        }
        // console.log(hash)
        // password = hash
    await connection.getRepository(posts_table)
    .createQueryBuilder()
    .insert()
    .values({ name, email, password: hash }).execute();
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

        const passMatch = await bcrypt.compare(req.body.password, hash);
        let userLogin = await result.findOne({ email: req.body.email, passMatch });
        
        console.log("Data ", userLogin);

        // res.status(401).send()    
        if (userLogin === undefined) {
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