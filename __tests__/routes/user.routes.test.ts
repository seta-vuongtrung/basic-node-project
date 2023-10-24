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
});
