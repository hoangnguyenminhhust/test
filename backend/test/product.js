/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('Products', () => {
  beforeEach((done) => {
    done();
  });

  describe('/POST products', () => {
    it('it should be GET new products', (done) => {
      chai.request(server)
        .post('/product/best-sell')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
