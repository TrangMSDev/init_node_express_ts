import db from "src/configs/db/config.db";
import { User } from "src/models/user";
import { TableNames } from "src/utils/syscats";

class UserService {
  async findByEmail(email: string): Promise<User> {
    try {
      let user = await db(TableNames.USER).where("email", email).first();
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getProfile(id: number): Promise<User> {
    try {
      // Cập nhật thông tin người dùng theo ID
      const result = await db(TableNames.USER)
        .select("id", "name", "avatar", "email")
        .where("id", id)
        .first();

      // Trả về số lượng bản ghi đã được cập nhật
      return result; // result là số lượng bản ghi đã cập nhật (0 nếu không có gì thay đổi)
    } catch (error: any) {
      throw new Error(error); // Ném lỗi nếu có
    }
  }

  async create(user: Partial<User>): Promise<number> {
    try {
      const [userId] = await db(TableNames.USER).insert(user);
      return userId;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserService();
