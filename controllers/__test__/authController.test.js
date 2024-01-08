const request = require("supertest");
const { expect, describe, it, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");
const app = require("../../server");

const testData = {
  email: "Kate@mail.com",
  password: "A@123456a",
};

describe("test POST /auth/login", () => {
  afterAll(() => {
    mongoose.disconnect();
    app.close();
  });

  it("should return status 200", async () => {
    const res = await request(app).post("/api/users/login").send(testData);
    expect(res.statusCode).toBe(200);
  });

  it("should return token", async () => {
    const res = await request(app).post("/api/users/login").send(testData);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it("should return obj user with 2 fields email and subscription with type String", async () => {
    const res = await request(app).post("/api/users/login").send(testData);
    expect(res.body).toEqual(
      expect.objectContaining({
        user: { email: expect.any(String), subscription: expect.any(String) },
      })
    );
  });
});
