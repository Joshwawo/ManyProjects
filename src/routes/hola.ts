import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en" style="background-color: darkslategray;">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello</title>
</head>
<body>
    <p style="color: white; text-align: center;">Hola :) </p>
    <br>
    <p style="color: white; text-align: center;">Soy jorge morales un gusto</p>

    
</body>
</html>
    `);
});

router.get('/hola', (req:Request, res:Response)=>{
    res.json({Message:'Hola!!!', statuscode:418})
})

export { router };
