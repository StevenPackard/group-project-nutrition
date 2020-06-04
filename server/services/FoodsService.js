import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class FoodsService {
  async find(query = {}) {
    let data = await dbContext.Foods.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }
  async findById(id) {
    let food = await dbContext.Foods.findById(id);
    if (!food) {
      throw new BadRequest("Invalid Id");
    }
    return food;
  }
  async create(body) {
    return await dbContext.Foods.create(body);
  }

  async remove(id, email) {
    let food = await this.findById(id);
    // @ts-ignore
    if (food.creatorEmail != email) {
      throw new UnAuthorized("Cannot delete another users food!");
    }
    await dbContext.Foods.findByIdAndDelete(id);
    return "Deleted wooooooooo";
  }
}

export const foodsService = new FoodsService();
