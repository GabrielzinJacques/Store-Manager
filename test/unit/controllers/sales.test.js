const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require("../../../services/salesService")
const salesController = require("../../../controllers/salesController")

describe('Testa na camada de services a função getAllSales', () => {
  describe('Quando existem produtos', () => {

    const response = [
      {
        saleId: 1,
        date: '2022-05-10T18:50:31.000Z',
        productId: 1,
        quantity: 5
      },
      {
        saleId: 1,
        date: '2022-05-10T18:50:31.000Z',
        productId: 2,
        quantity: 10
      },
      {
        saleId: 2,
        date: '2022-05-10T18:50:31.000Z',
        productId: 3,
        quantity: 15
      }
    ]

    const res = {}
    const req = {}

    beforeEach(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(response)

      sinon.stub(salesService, 'getAllSales').resolves(response)
    })

    afterEach(() => {
      salesService.getAllSales.restore()
    })

    it('Retorna um status 200', async () => {
      await salesController.getAllSales(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
    })


    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {
      await salesController.getAllSales(req, res)
      const [sale] = response
      expect(sale).to.have.all.keys('saleId', 'date', 'productId' ,'quantity')
      expect(res.json.calledWith(response)).to.be.equal(true)
    })
  })
})