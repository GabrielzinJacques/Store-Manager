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

describe('Testa na camada de models a função getById', () => {
  describe('Quando existe o id', () => {

    const result =  {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }

    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(result)
    })

    afterEach(() => {
      productsModel.getById.restore()
    })

    it('Retorna um objeto' , async () => {
      const response = await productsService.getById()
      expect(response).to.be.a('object')
    })

    it('Encontra um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await productsService.getById()
      expect(response).to.have.all.keys('id', 'name' ,'quantity')
    })
  })
  describe('Quando não encontra o id', () => {

    const response = [];

    before(() => {
      sinon.stub(productsModel, 'getById').resolves(response)
    })

    after(() => {
      productsModel.getById.restore()
    })

    it('Retorna um erro no status 404', async () => {
      try {
        await productsService.getById(6)
      } catch (err) {
        expect(err.status).to.be.equal(404)
      }
    });
  });
});
