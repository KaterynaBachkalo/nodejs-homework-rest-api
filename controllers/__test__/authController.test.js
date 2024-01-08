const request = require("supertest");

const app = require("../../server");

describe("test POST /auth/login", () => {
  it("should return status 200", async () => {
    const testData = {
      email: "Kate@mail.com",
      password: "A@123456a",
    };
    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(200);
  });

  it("should return token", async () => {
    const testData = {
      email: "Kate@mail.com",
      password: "A@123456a",
    };
    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it("should return obj user with 2 fields email and subscription with type String", async () => {
    const testData = {
      email: "Kate@mail.com",
      password: "A@123456a",
    };
    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.body).toEqual(
      expect.objectContaining({
        user: { email: expect.any(String), subscription: expect.any(String) },
      })
    );
  });
});
