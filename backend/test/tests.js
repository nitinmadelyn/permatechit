const config = require("../src/config/config");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();

chai.use(chaiHttp);
let orderId, userToken;

describe("Customer Login", () => {
  it("it should allow user to login", (done) => {
    chai
      .request(server)
      .post("/customer/login")
      .send({ email: "nitin.madelyn@gmail.com", password: "ilovepermatech" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        userToken = res.body.token;
        done();
      });
  });
});

describe("List orders", () => {
  it("it should fetch all orders with pagination", (done) => {
    chai
      .request(server)
      .get("/order")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("items");
        res.body.should.have.property("pagination");
        orderId = res.body.items[0].id;
        done();
      });
  });
});

describe("Update order status", () => {
  it("it should update order status to `Processing`", (done) => {
    chai
      .request(server)
      .put("/order/" + orderId)
      .send({ status: "Processing" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .be.equal("Order status updated successfully.");
        done();
      });
  });
});
