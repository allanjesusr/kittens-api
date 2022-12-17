const express = require('express');
const app = express();

const data = require('./kittens.json');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/');
//         console.log('file', file)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// var upload = multer({ storage: storage })


app.use(express.json());
app.use(express.static('public'));
app.use('/api', express.static('images'));
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
app.get('/', (req, res) => {
    console.log('Node Js Api')
})

app.get('/api/kittens', (req, res) => {
    res.send(data)
})

app.get('/api/kittens/:id', (req,res) => {
    const kitty = data.find( c => c.id === parseInt(req.params.id))
    if(!kitty) {
        return res.status(404).send('Kitty not found')
    } else {
        res.send(kitty)
    }
})

app.get('/api/kittens/:name', (req,res) => {
    const kittyName = data.find( c => c.name === parseInt(req.params.name))
    if(!kittyName) {
        return res.status(404).send('Kitty not found')
    } else {
        res.send(kittyName)
    }
})


const port = process.env.port || 4000;
app.listen(port, () => console.log(`Running server on PORT ${port}`))