const { expect, chai} = require( "chai");
const chaiHttp = require ("chai-http");
const { app } = require( "../app");
const { createUser } = require( "../services/user.service");
const { RolesTypeEnum } = require( "../utils/enums/user.roles.enum");

const newUser = {
    name: "admin",
    email: "admin@gmail.com",
    password: "password1234",
    role:  RolesTypeEnum.user
}

chai.should();

chai.use(chaiHttp);

describe("Home page", () => {


    it("it should get the home page", (done) => {
        chai
          .request(app)
          .get("/premier_league_api")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    it("it should return 404 error not found for no existing routes", (done) => {
        chai
            .request(app)
            .get("/abc_zyx")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

export default describe;

