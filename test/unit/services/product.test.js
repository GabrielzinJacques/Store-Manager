const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService")

describe('Testa na camada de services a função getAllProducts', () => {
  describe('Quando existem produtos', () => {
    const response = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]

    beforeEach(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves(response)
    })

    afterEach(() => productsModel.getAllProducts.restore())

    it('Retorna um array', async () => {
      const response = await productsService.getAllProducts()
      expect(response).to.be.an('array')
    })

    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await productsService.getAllProducts()
      expect(response).to.have.all.keys('id', 'name' ,'quantity')
    })
  })
})