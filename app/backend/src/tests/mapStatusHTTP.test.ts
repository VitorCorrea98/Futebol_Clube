import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import mapStatusHTTP from '../utils/mapStatusHTTP';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route /teams', () => {

  it('should return 200', async function() {
    const result = mapStatusHTTP('SUCCESSFUL')
    expect(result).to.equal(200);
  });

  it('should return 400', async function() {
    const result = mapStatusHTTP('INVALID_DATA')
    expect(result).to.equal(400);
  });

  it('should return 404', async function() {
    const result = mapStatusHTTP('NOT_FOUND')
    expect(result).to.equal(404);
  });

  it('should return 409', async function() {
    sinon.stub
    const result = mapStatusHTTP('CONFLICT')
    expect(result).to.equal(409);
  });

  it('should return 500', async function() {
    sinon.stub
    const result = mapStatusHTTP('BLABLABLA')
    expect(result).to.equal(500);
  });
 
});
