const express = require('express');
const router = express.Router();
var typeorm = require('typeorm');

const posts_table = "posts";

router.get('/login', async (req, res) => {
    const connection = typeorm.getConnection();

    var result = await connection.getRepository(posts_table)
        .createQueryBuilder().getMany();
    res.status(200).json({
        "Message": "Working",
        result
    })
})



module.exports = router;