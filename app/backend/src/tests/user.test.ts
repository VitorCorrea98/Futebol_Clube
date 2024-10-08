import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {teamFindAll, teamFindOne} from './mocks/Teams.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import { invalidLogin, user } from './mocks/User.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route /login', () => {
  it('should return login', async function() {
    const userLogin = SequelizeUser.build(user)
    sinon.stub(SequelizeUser, 'findOne').resolves(userLogin as any);
    const { email, password } = user
    const { status, body } = await chai.request(app).post('/login').send({email, password})
    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: "Invalid email or password"});
  });

  it('should return login', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(invalidLogin)

    expect(status).to.equal(400);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('All fields must be filled')
  });

  it('should return login', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(JWT, 'verify').resolves({data: {email :'vitor@correa.com'}});

    const {email, password} = user
    const { status, body } = await chai.request(app).post('/login')
    .set('authorization', 'Bearer validToken')
    .send({email, password})
    
    expect(status).to.equal(401);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('Invalid email or password')
  });
 
  afterEach(sinon.restore);
});
