"use strict";

const mochaPlugin = require("serverless-mocha-plugin");
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper("app", "/index.js", "handler");
let chaiHttp = require("chai-http");
let chai = mochaPlugin.chai;
let should = chai.should();
chai.use(chaiHttp);

var defaultEvent = (method, body) => {
  return {
    httpMethod: method,
    path: "/",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

let id = null;

// --------------------------------------------------------------

describe("POST API Calls", () => {
  it("should add an expense", async () => {
    let _event = Object.assign(
      {},
      defaultEvent("post", { name: "Testing", amount: 0 }),
      {
        path: "/api/expenses",
      }
    );

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(200);
      resBody.should.be.a("object");
      resBody.should.have.property("data");
      id = resBody.data._id;
    });
  });

  it("INVALID - add an expense record with invalid schema", async () => {
    let _event = Object.assign(
      {},
      defaultEvent("post", { abc: "Testing", lolol: 0, rubbish: "" }),
      {
        path: "/api/expenses",
      }
    );

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("data");
    });
  });
});

// --------------------------------------------------------------

describe("GET API Calls", () => {
  it("should get all expense records", async () => {
    let _event = Object.assign({}, defaultEvent("get", {}), {
      path: "/api/expenses",
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      expect(resBody).should.have.property("status");
      expect(resBody.data).to.be.an("array");
      res.should.have.status(200);
    });
  });

  it("should get a single expense record", async () => {
    let _event = Object.assign({}, defaultEvent("get", {}), {
      path: `/api/expenses/${id}`,
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      expect(resBody).to.be.a("object");
      res.should.have.status(200);
    });
  });

  it("INVALID - get expense that doesn't exist", async () => {
    let _event = Object.assign({}, defaultEvent("get", {}), {
      path: `/api/expenses/000`,
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("data");
    });
  });
});

// --------------------------------------------------------------

describe("PUT API Calls", () => {
  it("should update an expense", async () => {
    let _event = Object.assign(
      {},
      defaultEvent("put", { name: "Testing Updated", amount: 123123 }),
      {
        path: `/api/expenses/${id}`,
      }
    );

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(200);
      resBody.should.be.a("object");
      resBody.should.have.property("data");
    });
  });

  it("INVALID - update an expense that doesn't exist", async () => {
    let _event = Object.assign({}, defaultEvent("put", {}), {
      path: `/api/expenses/123`,
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("data");
    });
  });

  it("INVALID - update an expense with invalid params", async () => {
    let _event = Object.assign(
      {},
      defaultEvent("put", { abc: "lala", boo: 0 }),
      {
        path: `/api/expenses/123`,
      }
    );

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("data");
    });
  });

  it("INVALID - try to update an expense without providing id", async () => {
    let _event = Object.assign({}, defaultEvent("put", {}), {
      path: `/api/expenses/`,
    });

    return wrapped.run(_event).then((res) => {
      res.should.have.status(404);
    });
  });
});

// --------------------------------------------------------------

describe("DELETE API Calls", () => {
  it("should delete an expense", async () => {
    let _event = Object.assign({}, defaultEvent("delete", {}), {
      path: `/api/expenses/${id}`,
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(200);
      resBody.should.have.property("message");
      resBody.should.have.property("status").eq("success");
    });
  });

  it("INVALID - try to delete an expense that doesn't exist", async () => {
    let _event = Object.assign({}, defaultEvent("delete", {}), {
      path: `/api/expenses/123123`,
    });

    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("status").eq("failed");
    });
  });

  it("INVALID - try to delete an expense without providing id", async () => {
    let _event = Object.assign({}, defaultEvent("delete", {}), {
      path: `/api/expenses/`,
    });

    return wrapped.run(_event).then((res) => {
      res.should.have.status(404);
    });
  });
});

describe("Convert Currency", () => {
  it("should convert currency", async () => {
    let _event = Object.assign({}, defaultEvent("get", {}), {
      path: `/api/convert`,
      queryStringParameters: { to: "SGD", from: "USD", amount: 100 },
    });
    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(200);
      resBody.should.have.property("data");
      resBody.should.have.property("status").eq("success");
    });
  });

  it("INVALID - convert currency with invalid params", async () => {
    let _event = Object.assign({}, defaultEvent("get", {}), {
      path: `/api/convert`,
    });
    return wrapped.run(_event).then((res) => {
      let resBody = JSON.parse(res.body);
      res.should.have.status(404);
      resBody.should.have.property("message");
      resBody.should.have.property("status").eq("failed");
    });
  });
});
