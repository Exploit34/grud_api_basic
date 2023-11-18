import app from "../src/app";
import request  from "supertest";

describe('GET /', () => {
    test('respuesta de ver todos los datos json', async () => {
        const responde = await request(app).get('/').send();
        expect(responde.statusCode).toBe(200);
    });
});

describe('GET /api/', () => {
    test('si hay resultado de los productos por id', async () => {
        const responde = await request(app).get('/api/1').send();
        expect(responde.statusCode).toBe(200);
    });
});

describe('POST /api', () => {
    test('guardar producto en la data', async () => {
        const response = await request(app)
            .post('/api') 
            .send({ "id": 5, "name": "pluma" });

        expect(response.statusCode).toBe(201);
    });
});

describe('PUT /api', () => {
    test('actualizar datos', async () => {
        const uproducto = {id: 1, name: "agua"};
        const response = await request(app)
            .put('/api/1')
            .send(uproducto);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(uproducto);
    });
});


describe('DEL /api', () => {
    test('borrar datos', async () => {
        const response = await request(app)
            .delete('/api/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('producto eliminado correctamente');
    })
})