import { Router, Request, Response } from "express";

import UserService from "../services/user.services";

const router = Router();

router.get("/:id", (req: Request, res: Response): void => {
  const id = req.params.id;

  const user = UserService.getUserById(parseInt(id));
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).json({
      error: "NOT FOUND",
      message: `not found user with id ${id}!`,
    });
  }
});

router.get("/", (req: Request, res: Response): void => {
  const users = UserService.getAllUser();
  res.status(200).send(users);
});

router.delete("/:id", (req: Request, res: Response): void => {
  const id = req.params.id;

  const deleted = UserService.deleteUserById(parseInt(id));
  if (deleted) {
    res.status(200).send({
      message: `Delete user with id ${id} successful!`,
    });
  } else {
    res.status(404).json({
      error: "NOT FOUND",
      message: `Not found user with id ${id}!`,
    });
  }
});

export { router };
