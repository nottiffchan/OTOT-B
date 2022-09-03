let chai = require("chai");
let chaiHttp = require("chai-http");
var server = require("../index");
let should = chai.should();
chai.use(chaiHttp);

describe("Expenses", function () {
  // --------------------------------------------------------------

  describe("Unhappy Paths - Valid Input", () => {
    it("Add an expense record with invalid schema", (done) => {
      chai
        .request(server)
        .post(`/api/expenses/`)
        .send({ abc: "Testing", lolol: 0, rubbish: "hi" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          done();
        });
    });
    it("Getting expense that doesn't exist", (done) => {
      chai
        .request(server)
        .get(`/api/expenses/123`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          done();
        });
    });
    it("Updating expense that doesn't exist", (done) => {
      chai
        .request(server)
        .put(`/api/expenses/123`)
        .send({ name: "Testing Updated", amount: 0 })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          done();
        });
    });
    it("Updating expense without providing params", (done) => {
      chai
        .request(server)
        .put(`/api/expenses/123`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          done();
        });
    });
    it("Deleting expense that doesn't exist", (done) => {
      chai
        .request(server)
        .delete(`/api/expenses/123`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          res.body.should.have.property("status").eq("failed");

          done();
        });
    });
  });

  // --------------------------------------------------------------

  describe("Happy Paths", () => {
    this.timeout(5000);
    it("should get a single expense record", (done) => {
      const id = "6313427e01d31c769204bd58";
      chai
        .request(server)
        .get(`/api/expenses/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should get all expenses", (done) => {
      chai
        .request(server)
        .get("/api/expenses")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eq("success");
          res.body.should.have.property("data");
          res.body.data.should.be.an("array");
          done();
        });
    });

    it("should add an expense", (done) => {
      chai
        .request(server)
        .post(`/api/expenses`)
        .send({ name: "Testing", amount: 0 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");

          done();
        });
    });

    it("should update expense", (done) => {
      const id = "6313427e01d31c769204bd58";
      chai
        .request(server)
        .put(`/api/expenses/${id}`)
        .send({ name: "Testing Updated", amount: 0 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          done();
        });
    });
  });

  //  ----------------------------------------

  describe("Unhappy Paths - Invalid Input", () => {
    it("Getting expense without providing id", (done) => {
      chai
        .request(server)
        .get(`/api/expenses`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eq("success");
          res.body.should.have.property("data");
          res.body.data.should.be.an("array");
          done();
        });
    });
    it("Updating expense without providing id", (done) => {
      chai
        .request(server)
        .put(`/api/expenses`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("Deleting expense without providing id", (done) => {
      chai
        .request(server)
        .delete(`/api/expenses`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
