const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res)=> {
    // res.json({message: "hello, working?"});
    res.send(req.body);
    console.log(req.body);
});

app.get('/user/:id', (req, res) => {
    res.send(req.params);
    console.log(req.params);
});

app.listen(5000, ()=>{console.log("listening at port 5000")});