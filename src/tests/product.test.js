require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

let TOKEN
let category
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'

let product
let productId

beforeAll(async () => {

  const hits = {
    email: "ipena@gmail.com",
    password: "iuvil12345",
  };

  const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(hits)

  TOKEN = res.body.token
  // console.log(TOKEN);

  category = await Category.create({ name: 'Zapatos para Caballeros' })

  product = {
    title: 'Zapatos Nike',
    description: 'no 32',
    price: 20.99,
    categoryId: category.id
  }
})

//beforeEach(() => {
//console.log('Ejecutar antes del test');
//})

afterAll((async () => {
  await category.destroy()
}))

//TEST

//Create
test("POST -> 'BASE_URL', should return status code 201, and res.body.title === product.title", async () => {

  // console.log(TOKEN);
  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

  // console.log(res.body);
  productId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
  expect(res.body.categoryId).toBe(category.id)
})

//GetAll
test("GET -> 'BASE_URL', should return status code 200, and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  // console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  //1:n
  expect(res.body[0].category.id).toBeDefined()
  expect(res.body[0].category.id).toBe(category.id)

})

//GetOne
test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.title === product.title", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

  // console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()

  //1:n
  expect(res.body.category.id).toBeDefined()
  expect(res.body.category.id).toBe(category.id)
})

//Update
test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {

  const updateProduct = {
    title: 'Zapatos Puma'
  }
  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(updateProduct)
    .set('Authorization', `Bearer ${TOKEN}`)

  // console.log(res.body);s
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(updateProduct.title)

  //1:n
  expect(res.body.categoryId).toBeDefined()
  expect(res.body.categoryId).toBe(category.id)
})

//Delete
test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
  // console.log(res.body);

  expect(res.status).toBe(204)
})