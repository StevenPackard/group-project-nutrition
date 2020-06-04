import express from "express";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import auth0Provider from "@bcwdev/auth0provider";

export class PostsController extends BaseController {
  constructor() {
    super("api/posts");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.remove);
  }
  async getAll(req, res, next) {
    try {
      let data = await postsService.find();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await postsService.create(req.body);
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await postsService.remove(req.params.id, req.userInfo.email);
      res.send("Delorted");
    } catch (error) {
      next(error);
    }
  }
}
