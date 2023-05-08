const express = require('express');
let data = require('./data');
const cors = require('cors');


const app = express();
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/data', (req, res) => {
    res.status(200).send(data);
})

app.post('/add', (req, res) => {
    data.push({id: data.length, todo: req.body.addData});
    res.status(200);
})

app.post('/remove', (req, res) => {
    console.log(req.body);
    data = [...data.filter((x) => x.id !== req.body.id)];
    res.status(200)
})

app.listen(4000, () => {
    console.log('**🙉 server is listening on 4000 ...**');
})