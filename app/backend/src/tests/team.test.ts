import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'

import {teamFindAll} from './mocks/Teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamFindAll as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamFindAll);
  });
 
  afterEach(sinon.restore);
});
