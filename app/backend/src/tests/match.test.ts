import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeUser from '../database/models/SequelizeUser';
import { HomeAwayGoals, HomeAwayMatch, matches } from './mocks/Match.mock';
import { user } from './mocks/User.mock';
import ExtractTeamId from '../utils/Match/ExtractTeamId';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route /matches', () => {
  it('should return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should update a match goals', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves(matches as any);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(JWT, 'verify').resolves({data: {email :'vitor@correa.com'}});

    const { status, body } = await chai.request(app).patch('/matches/1')
    .set('authorization', 'Bearer validToken')
    .send(HomeAwayGoals);

    expect(status).to.equal(200);
  });

  it('should return all matches', async function() {
    const teamsIds = new ExtractTeamId(HomeAwayMatch).getIds(); 

    expect(teamsIds).to.deep.equal([16, 8]);
  });
 
  afterEach(sinon.restore);
});
