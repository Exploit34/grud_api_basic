import express  from 'express'
import bodyParser from 'body-parser'


const app = express();

app.use(bodyParser.json());

//hacemos datos de para poder consumir
let data = [
    {id: 1, name: 'huevos'},
    {id: 2, name: 'carne'},
    {id: 3, name: 'arroz'},
    {id: 4, name: 'panela'}
];


app.get('/', (req, res) => {
    try{
        res.json(data);
    } catch (error){
        console.error('error de la api', error);
        res.status(500).send('Error interno del servidor');
    }
});

//api consumida por id del producto
app.get('/api/:id', (req, res) => {
    const productoid = parseInt(req.params.id);
    const producto = data.find(item => item.id === productoid);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({error: 'producto no encontrado'});
    }
});

//
app.post('/api', (req, res) => {
    const nproducto = req.body;
    data.push(nproducto);
    res.status(201).json(nproducto);
});

//actualiacion por id
app.put('/api/:id', (req, res) => {
    const productoid = parseInt(req.params.id);
    const uproducto = req.body;

    data = data.map(item => (item.id === productoid ? uproducto : item));

    res.json(uproducto);
});

//borrar datos por id
app.delete('/api/:id', (req,res) => {
    const productoid = parseInt(req.params.id);
    data = data.filter(item => item.id !== productoid);

    res.json({ message: 'producto eliminado correctamente' });
});

export default app;