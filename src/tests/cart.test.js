require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

let TOKEN
let product
let cart
let cartId

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'


beforeAll(async () => {
    const body = {
        email: "ipena@gmail.com",
        password: "iuvil12345",
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(body)

    TOKEN = res.body.token

    product = await Product.create({
        title: 'Zapatos',
        description: 'Zapatos negros',
        price: 34.90
    })

    cart = {
        quantity: 1,
        productId: product.id
    }
});

afterAll(async () => {
    await product.destroy()
});

test("POST --> 'BASE_URL' should return status code 201, and res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
     .post(BASE_URL)
     .set('Authorization', `Bearer ${TOKEN}`)
     .send(cart)

     cartId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.productId).toBe(cart.productId)
});

test("GET ---> 'BASE_URL', should return status code 200 and res.body[0].quantity === cart.quantity", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].quantity).toBe(cart.quantity)
});

test("GET --> 'BASE_URL/:id', should return status code 200 and res.body.quantity === cart.quantity", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
});

test("PUT --> 'BASE_URL/:id', should return status code 200 and res.body.quantity === cartUpdate.quantity", async () => {

    const cartUpdate = {
        quantity: 2
    }

    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(cartUpdate)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
});

test("DELETE --> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})