import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class PostsService {
  async find(query = {}) {
    let data = await dbContext.Posts.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }
  async findById(id) {
    let post = await dbContext.Posts.findById(id);
    if (!post) {
      throw new BadRequest("Invalid Id");
    }
    return post;
  }
  async create(body) {
    return await dbContext.Posts.create(body);
  }

  async remove(id, email) {
    let post = await this.findById(id);
    // @ts-ignore
    if (post.creatorEmail != email) {
      throw new UnAuthorized("Cannot delete another users post!");
    }
    await dbContext.Posts.findByIdAndDelete(id);
    return "Deleted wooooooooo";
  }
}

export const postsService = new PostsService();
