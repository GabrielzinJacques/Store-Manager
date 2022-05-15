const sinon = require("sinon");
const { expect } = require("chai");
const produtsController = require('../../../controllers/productsController')
const productsService = require("../../../services/productsService")

describe('Testa na camada de controllers a função getAllProducts', () => {
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

    const res = {}
    const req = {}

    beforeEach(() => {

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(response)

      sinon.stub(productsService, 'getAllProducts').resolves(response)
    })

    afterEach(() => productsService.getAllProducts.restore())

    it('Retorna um status 200', async () => {
      await produtsController.getAllProducts(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })

    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {

      await produtsController.getAllProducts(req, res)
      const [product] = response
      expect(product).to.have.all.keys('id', 'name', 'quantity')
      expect(res.json.calledWith(response)).to.be.equal(true)
    })
  })
})