const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService")

describe('Testa na camada de services a função getAllSales', () => {
  describe('Quando existem produtos', () => {

    const response =  [
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

    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves(response)
    })

    after(() =>  {
      salesModel.getAllSales.restore()
    })

    it('Retorna um array', async () => {
      const response = await salesService.getAllSales()
      expect(response).to.be.an('array')
    })

    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await salesService.getAllSales()
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    })

  })
})