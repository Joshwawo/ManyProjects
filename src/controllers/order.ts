import { Request, Response } from "express";
import { getById } from "../services/item";
import { handleHttp } from "../utils/error.handle";
import {JwtPayload} from 'jsonwebtoken'
import {RequestExt} from '../interfaces/reqExt'

// interface RequestExt extends Request {
//   user?: string | JwtPayload
// }

const getItems = async (req: RequestExt, res: Response) => {
  try {

    let user2 = await req.user
     res.send({
      data: "Esto solo lo ves si estas auth",
      user: user2, 
    });
  } catch (error) {
    handleHttp(res, "Error_GET_BLOGS");
  }
};

export { getItems };
