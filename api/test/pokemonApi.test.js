const chai = require("chai");
const chaiHttp = require(require.resolve("chai-http"));
const app = require("../src/index");
const { expect } = chai;

chai.use(chaiHttp);

describe("Pokémon API", () => {
  describe("GET /api/pokemon", () => {
    it("should return a list of Pokémon", (done) => {
      chai
        .request(app)
        .get("/api/pokemon")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("GET /api/pokemon/:id", () => {
    it("should return details of a Pokémon by ID", (done) => {
      chai
        .request(app)
        .get("/api/pokemon/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id", 1);
          expect(res.body).to.have.property("name", "bulbasaur");
          done();
        });
    });

    it("should return 500 for an invalid Pokémon ID", (done) => {
      chai
        .request(app)
        .get("/api/pokemon/999999")
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });

  describe("GET /api/search/:term", () => {
    it("should return a Pokémon by search term", (done) => {
      chai
        .request(app)
        .get("/api/search/pikachu")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("name", "pikachu");
          done();
        });
    });

    it("should return 404 for a non-existent Pokémon", (done) => {
      chai
        .request(app)
        .get("/api/search/nonexistent")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });
});
