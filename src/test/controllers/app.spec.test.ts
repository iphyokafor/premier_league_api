import chai from 'chai';
import chatHttp from 'chai-http';
import { app } from "../../app";
import userModel from '../../models/user.model';
import { user, admin, user2 } from "./test.data";


chai.use(chatHttp);
const { expect } = chai;

const url = "/api";

let access_token: string;

describe("it should test the mock premier league api", () => {
  before(async () => {
    await userModel.deleteMany({})
  });

  it("it should get the home page", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/premier_league_api`)
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal('success');
    expect(result.body.message).to.be.equal('Welcome to gomoney premier league⚽️⛹️‍♂️👈👈');
  });

  it("it should return 404 error not found for routes that doesn't exist", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/abc_zyx`)
    expect(result.status).to.equal(404);
    expect(result.body.status).to.be.equal('error');
    expect(result.body.message).to.be.equal(`Route ${url}/abc_zyx not found`);
  });

  it("it should register a user successfully", async () => {
    const result = await chai.request(app)
      .post(`${url}/auth/register`)
      .set('Accept', 'application/json')
      .send(user)
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal('success');
    expect(result.body.data.user).to.be.equal(result.body.data.user);
    expect(result.body.data.access_token).to.be.equal(result.body.data.access_token)
    access_token = result.body.data.access_token
  });

  it("it should register an admin successfully", async () => {
    const result = await chai.request(app)
      .post(`${url}/auth/register`)
      .set('Accept', 'application/json')
      .send(admin)
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal('success');
    expect(result.body.data.admin).to.be.equal(result.body.data.admin);
    expect(result.body.data.access_token).to.be.equal(result.body.data.access_token)
    access_token = result.body.data.access_token
  });

  it('It should not signup a user with duplicate details', async () => {
    const result = await chai.request(app)
      .post(`${url}/auth/register`)
      .set('Accept', 'application/json')
      .send(user)
    expect(result.body.status).to.be.equal('fail');
    expect(result.body.message).to.be.equal('Email already exist');
  });


  it('It should generate token when user logs in', async () => {
    const result = await chai.request(app)
      .post(`${url}/auth/login`)
      .set('Accept', 'application/json')
      .send(user2)
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal('success');
    expect(result.body.access_token).to.be.equal(result.body.access_token)
    access_token = result.body.access_token
  });

});
