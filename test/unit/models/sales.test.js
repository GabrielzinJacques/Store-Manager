const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");
const salesModel = require("../../../models/salesModel")

describe('Testa na camada de models a função getAllSales', () => {
  describe('Quando existem produtos', () => {

    const response =  [[
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
    ]]

    beforeEach(() => {
      sinon.stub(connection, 'query').resolves(response)
    })

    afterEach(() =>  {
      connection.query.restore()
    })

    it('Retorna um array', async () => {
      const response = await salesModel.getAllSales()
      expect(response).to.be.an('array')
    })

    it('Retorna um array com objetos de cada produto com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await salesModel.getAllSales()
      expect(response).to.have.all.keys('saleId', 'date', 'productId', 'quantity')
    })
  })
})