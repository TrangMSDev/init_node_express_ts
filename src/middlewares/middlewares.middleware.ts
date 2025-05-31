import { NextFunction, Request, Response } from "express";
import { AuthService } from "src/services/auth.service";


class Middleware {
   async checkLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      if (!req.headers.authorization) {
        
        return res.status(401).json("Invalid access token");
      }
  
      const token = req.headers.authorization.split(" ")[1];
      const decode = await AuthService.verifyAccessToken(token);
  
      if (decode === "jwt expired") {
        return res.status(401).json("Access token expired");
      } else if (!decode) {
        return res.status(401).json("Invalid access token");
      }
  
      req.body.decode = decode; // Gán `decode` vào `req.body` nếu cần
      next(); // Nếu hợp lệ, gọi `next`
    } catch (error) {
      console.error(error);
      next(error); // Truyền lỗi vào Express error handler
    }
  }
}

export default new Middleware();