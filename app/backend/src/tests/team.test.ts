import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'

import {teamFindAll, teamFindOne} from './mocks/Teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route /teams', () => {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teamFindAll as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamFindAll);
  });

  it('should return one team', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(teamFindOne as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamFindOne);
  });

  it('should return an error for invalid id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body).to.haveOwnProperty('message')
  });
 
  afterEach(sinon.restore);
});
