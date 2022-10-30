import { NextFunction, Request, Response } from "express";

const logMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const header = req.headers["user-agent"]
    console.log(`User-agent = ${header}`)
    // console.log("Hola soy el log")
    // res.send("Desde middleware")
//   next();
};

export { logMiddleWare };
