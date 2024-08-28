require('../models')
const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'
let TOKEN
let cartId
let userCart
let productId
let userIdpur
let purchaseId

const user = {
  firstName: "Iuvil",
  lastName: "Peña",
  email: "ipena@gmail.com",
  password: "iuvil12345",
  phone: "+18093224564"
}

const category = {name: 'Zapatillas'}

const product = {
    title: "Zapatos Nike'",
    description: "rojos",
    price: 24.99,
    categoryId: category.id
}

const cart = {
    userId: 1,
    productId: 1,
    quantity: 2
}

const purchase = {
    userId: cart.userId,
    productId: cart.productId,
    quantity: cart.quantity
}

//Login
beforeAll(async()=>{

    const hits = {
        email: "ipena@gmail.com",
        password: "iuvil12345",
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)

    TOKEN = res.body.token
    //console.log(TOKEN);
    userId = res.body.user.id
});

//Create
test("POST -> BASE_URL, should return statusCode 201, and res.body. === cart.userId", async() =>{

    purchaseCreate = await Purchase.bulkCreate(cart);


    const res = await request(app)
        .post(BASE_URL)
        .send(purchaseCreate)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    purchaseId= res.body.id;
    //console.log(res.body);

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchaseCreate.userId)
});


//GetAll
test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    //expect(res.body.userId).toBe(userId)
});