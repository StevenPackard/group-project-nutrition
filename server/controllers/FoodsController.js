import express from "express";
import BaseController from "../utils/BaseController";
import { foodsService } from "../services/FoodsService";
import auth0Provider from "@bcwdev/auth0provider";

export class FoodsController extends BaseController {
  constructor() {
    super("api/foods");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.remove);
  }
  async getAll(req, res, next) {
    try {
      let data = await foodsService.find();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await foodsService.create(req.body);
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await foodsService.remove(req.params.id, req.userInfo.email);
      res.send("Delorted");
    } catch (error) {
      next(error);
    }
  }
}
