import request from "supertest";

import app from "../../src/app";

describe("User routes", () => {
  const users = [
    {
      id: 1,
      name: "Goon",
      email: "Goon@gmail.com",
    },
    {
      id: 2,
      name: "Tsuki",
      email: "Tsuki@gmail.com",
    },
    {
      id: 3,
      name: "Joe",
      email: "Joe@gmail.com",
    },
  ];
  describe("Get all users", () => {
    test("Get all users should return all users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users);
    });
  });

  describe("User user by Id", () => {
    test("found user by Id should return status code 200 & user.", async () => {
      const res = await request(app).get("/users/1");
      const foundUser = users[0];
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(foundUser);
    });

    test("not found user by Id should return status code 404 & error message", async () => {
      const res = await request(app).get("/users/4");
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("not found user with id 4!");
    });
  });

  describe("Delete user by Id", () => {
    test("found user by Id should return status code 200.", async () => {
      const res = await request(app).delete("/users/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("Delete user with id 1 successful!");
    });

    test("not found user by Id should return status code 404 & error message", async () => {
      const res = await request(app).delete("/users/4");
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("Not found user with id 4!");
    });
  });

  describe("Create User", () => {
    test("missing user id should return error with status code 400.", async () => {
      const payload = { name: "john", email: "john@gmail.com" };

      const res = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual(
        "Invalid input user id, name, email are required!"
      );
    });

    test("missing user name should return error with status code 400.", async () => {
      const payload = { id: 1, name: "", email: "john@gmail.com" };

      const res = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual(
        "Invalid input user id, name, email are required!"
      );
    });

    test("missing email should return error with status code 400.", async () => {
      const payload = { id: 1, name: "john", email: "" };

      const res = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual(
        "Invalid input user id, name, email are required!"
      );
    });

    test("valid body should return status code 200 & data", async () => {
      const payload = { id: 6, name: "john", email: "john@gmail.com" };

      const res = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("Create new user successful!");
    });

    test("found duplicate user should return status code 400.", async () => {
      const payload = { id: 6, name: "john", email: "john@gmail.com" };

      const res = await request(app)
        .post("/users")
        .send(payload)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Duplicated user with id 6!");
    });
  });
});
