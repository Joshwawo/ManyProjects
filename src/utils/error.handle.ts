import { Response } from "express";
const handleHttp = (res: Response, error: string, erroRaw?:any) => {+
  console.log(erroRaw)
  res.status(500);
  res.send({ error: error });
};

export { handleHttp };
