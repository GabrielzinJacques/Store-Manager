const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel')
const connection = require('../../../models/connection');

describe('Testa na camada de models a função getAllProducts', () => {
  describe('Quando existem produtos', () => {

    const response = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]]

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(response)
    })

    afterEach(() => connection.query.restore())

    it('Retorna um array', async () => {
      const response = await productsModel.getAllProducts()
      expect(response).to.be.an('array')
    })

    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await productsModel.getAllProducts()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })
})

describe('Testa na camada de models a função getById', () => {
  describe('Quando existe o id', () => {

    const response =  [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]]

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(response)
    })

    afterEach(() => connection.query.restore())

    it('Retorna um objeto' ,async () => {
      const response = await productsModel.getById()
      expect(response).to.be.an('object')
    })

    it('Encontra um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await productsModel.getById()
      expect(response).to.have.all.keys('id', 'name', 'quantity')
    })
  })

  describe('Quando não encontra o id', () => {
    const response = [[]]

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(response)
    })

    afterEach(() => connection.query.restore())

    it('deve retornar undefined' ,async () => {
      const response = await productsModel.getById()
      expect(response).to.be.undefined
    })
  })
})