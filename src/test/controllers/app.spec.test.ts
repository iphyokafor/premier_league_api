import chai from "chai";
import chatHttp from "chai-http";
import { app } from "../../app";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import {
  user,
  admin,
  user2,
  admin2,
  team,
  updateTeam,
  fixture,
  team2,
  updateFixture,
  user3,
  user4,
} from "./test.data";

chai.use(chatHttp);
const { expect } = chai;

const url = "/api";

let access_token: string = "";
let admin_access_token: string = "";
let teamId: string = "";
let team2Id: string = "";
let fixtureId: string = "";
let shortCode: string = "";

describe("it should test the mock premier league api", () => {
  before(async () => {
    await userModel.deleteMany({});
    await teamModel.deleteMany({});
  });

  it("it should get the home page", async () => {
    const result = await chai.request(app).get(`${url}/premier_league_api`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.message).to.be.equal(
      "Welcome to gomoney premier league⚽️⛹️‍♂️👈👈"
    );
  });

  it("it should return 404 error not found for routes that doesn't exist", async () => {
    const result = await chai.request(app).get(`${url}/abc_zyx`);
    expect(result.status).to.equal(404);
    expect(result.body.status).to.be.equal("error");
    expect(result.body.message).to.be.equal(`Route ${url}/abc_zyx not found`);
  });

  it("it should register a user successfully", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/register`)
      .set("Accept", "application/json")
      .send(user);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.user).to.be.equal(result.body.data.user);
    expect(result.body.data.access_token).to.be.equal(
      result.body.data.access_token
    );
  });

  it("it should register an admin successfully", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/register`)
      .set("Accept", "application/json")
      .send(admin);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.admin).to.be.equal(result.body.data.admin);
    expect(result.body.data.access_token).to.be.equal(
      result.body.data.access_token
    );
  });

  it("It should not signup a user with duplicate details", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/register`)
      .set("Accept", "application/json")
      .send(user);
    expect(result.body.status).to.be.equal("fail");
    expect(result.body.message).to.be.equal("Email already exist");
  });

  it("It should not login a user with incorect email", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/login`)
      .set("Accept", "application/json")
      .send(user3);
    expect(result.status).to.equal(401);
    expect(result.body.status).to.be.equal("fail");
    expect(result.body.message).to.be.equal("Invalid email or password");
  });

  it("It should not login a user with incorect password", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/login`)
      .set("Accept", "application/json")
      .send(user4);
    expect(result.status).to.equal(401);
    expect(result.body.status).to.be.equal("fail");
    expect(result.body.message).to.be.equal("Invalid email or password");
  });

  it("It should generate token when user logs in", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/login`)
      .set("Accept", "application/json")
      .send(user2);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.access_token).to.be.equal(result.body.access_token);
    access_token = result.body.access_token;
  });

  it("It should log in an admin", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/auth/login`)
      .set("Accept", "application/json")
      .send(admin2);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.access_token).to.be.equal(result.body.access_token);
    admin_access_token = result.body.access_token;
  });

  it("it should get all users", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/users`)
      .set("Authorization", `Bearer ${admin_access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.result).to.be.equal(result.body.result);
    expect(result.body.data.users).to.be.equal(result.body.data.users);
  });

  it("it should get a logged in user profile", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/users/me`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.user).to.be.equal(result.body.data.user);
  });

  it("It should create a team", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/teams/create`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send(team);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.team).to.be.equal(result.body.data.team);
    teamId = result.body.data.team.id;
  });

  it("It should create another team", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/teams/create`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send(team2);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.team).to.be.equal(result.body.data.team);
    team2Id = result.body.data.team.id;
  });

  it("It should not create team with duplicate details", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/teams/create`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send(team);
    expect(result.body.status).to.be.equal("fail");
    expect(result.body.message).to.be.equal("Nick name already exist");
  });

  it("It should update a Team", async () => {
    const result = await chai
      .request(app)
      .put(`${url}/teams/update-team/${teamId}`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send(updateTeam);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.message).to.be.equal(
      `Team ${updateTeam.name} has been updated successfully.`
    );
  });

  it("it should get all teams", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/teams`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.result).to.be.equal(result.body.result);
    expect(result.body.data.teams).to.be.equal(result.body.data.teams);
  });

  it("it should search teams", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/search/search-team`)
      .query({ limit: 1, page: 1, search: "Dwane" });
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.result).to.be.equal(result.body.data.result);
  });

  it("It should create fixture", async () => {
    const result = await chai
      .request(app)
      .post(`${url}/fixtures/create`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send({ homeTeam: teamId, awayTeam: team2Id, ...fixture });
    expect(result.status).to.equal(201);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.fixture).to.be.equal(result.body.data.fixture);
    fixtureId = result.body.data.fixture.id;
    shortCode = result.body.data.fixture.shortCode;
  });

  it("it should get all fixtures", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/fixtures`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.viewAllFixtures).to.be.equal(
      result.body.data.viewAllFixtures
    );
  });

  it("it should get unique fixture by link", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/fixtures/${shortCode}`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.fixture).to.be.equal(result.body.data.fixture);
  });

  it("it should get all completed fixtures", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/fixtures/get/completed`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.viewCompletedFixtures).to.be.equal(
      result.body.data.viewCompletedFixtures
    );
  });

  it("it should get all pending fixtures", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/fixtures/get/pending`)
      .set("Authorization", `Bearer ${access_token}`);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.viewPendingFixtures).to.be.equal(
      result.body.data.viewPendingFixtures
    );
  });

  it("It should update a fixture", async () => {
    const result = await chai
      .request(app)
      .put(`${url}/fixtures/update-fixture/${fixtureId}`)
      .set("Authorization", `Bearer ${admin_access_token}`)
      .set("content-type", "application/json")
      .send(updateFixture);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.message).to.be.equal(
      `Fixture has been updated successfully.`
    );
  });

  it("it should search fixtures", async () => {
    const result = await chai
      .request(app)
      .get(`${url}/search/search-fixture`)
      .query({ limit: 1, page: 1, search: "Dean court" });
    expect(result.status).to.equal(200);
    expect(result.body.status).to.be.equal("success");
    expect(result.body.data.result).to.be.equal(result.body.data.result);
  });
});
