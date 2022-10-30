import { Request, Response } from "express";
import BlogModel from "../models/blog.model";
import { poolConexion } from "../config/sqlServer";
import { dateFetch } from "../services/testing.services";

const testingParams = async (req: Request, res: Response) => {
  try {
    // res.send(`Hello ${req.params.name} ${req.params.lastname}`);
    ///how to return html

    const { name, lastname, bg } = req.params;
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body style="background-color: #${bg};" >

    <h1>Hola ${name} ${lastname}</h1>

        
    </body>
    </html>`);
  } catch (error) {
    console.log(error);
  }
};

const userData = async (req: Request, res: Response) => {
  try {
    // res.send("hola desde user data")
    // let name = req.query
    // let lastname = req.query
    const { name, lastname, bg } = req.query;

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body style="background-color: ${bg};" >

    <h1>Hola ${name} ${lastname}</h1>

    

        
    </body>
    </html>`);

    // res.send(`Hola ${name.name} ${name.lastname}`)
  } catch (error) {
    res.send(error);
  }
};

const queryMongo = async (req: Request, res: Response) => {
  try {
    let { title, tech, fecha } = req.query;
    // fecha = new Date(fecha);

    // const Queryfecha = "2022,09,25";
    // new Date(fecha)
    let date = new Date(fecha as string);

    // const querySearch = await BlogModel.find({title: title}, {tech: tech})

    // const querySearch2 = await BlogModel.find({tech: tech})

    //nested query search title and tech

    // const querySearch3 = await BlogModel.find({$and: [{ title: title }, { tech: tech }],});
    const queryDate = await BlogModel.find({ createdAt: { $gte: date } });

    console.log(queryDate);
    // console.log(new Date());

    res.send(queryDate);
  } catch (error) {
    res.send(error);
  }
};

const queryBeetWeenDates = async (req: Request, res: Response) => {
  try {
    let { fecha1, fecha2 } = req.query;

    let date1 = new Date(fecha1 as string);
    let date2 = new Date(fecha2 as string);

    // let fechaRara = "2022-09-25T00:00:00.000Z";
    // //formatear fecha para que quede 2022-09-25
    // let fechaRara2 = fechaRara.split("T").shift();
    // console.log(fechaRara2);

    // console.log(fechaRara);

    // console.log(date1);
    // console.log(date2);
    -console.log(date1);
    console.log(date2);

    const queryDate = await BlogModel.find({
      createdAt: { $gte: date1, $lte: date2 },
    });

    if (queryDate.length === 0) {
      res.status(404).send("No hay datos");
    } else {
      res.send(queryDate);
    }

    // console.log(queryDate);
  } catch (error) {
    res.send(error);
  }
};

const queryByNameAndDate = async (req: Request, res: Response) => {
  try {
    let { name, fecha1, fecha2 } = req.query;

    let date1 = new Date(fecha1 as string);
    let date2 = new Date(fecha2 as string);

    const queryDate = await BlogModel.find({
      createdAt: { $gte: date1, $lte: date2 },
      title: name,
    });

    if (queryDate.length === 0) {
      res.status(404).send("No hay datos");
    } else {
      res.send(queryDate);
    }
  } catch (error) {
    res.send(error);
  }
};

const sqlTest = async (req: Request, res: Response) => {
  try {
    // console.log(req)
    const { start, end } = req.query;

    const resultado = await dateFetch(start as string, end as string);

    if (resultado?.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.send(resultado);
    }
    // const pool = await poolConexion();
    // // const result = await pool?.request().query("select * from dbo.timestampDemo");
    // const result = await pool?.request().query(`SELECT * FROM timestampDemo WHERE created_at BETWEEN '${start}' AND '${end}'`);

    // if(result?.recordset.length === 0){
    //     res.status(404).send("No hay datos")
    // }else{
    //     res.send(result?.recordset)
    // }
  } catch (error) {
    res.send(error);
  }
};

export {
  testingParams,
  userData,
  queryMongo,
  queryBeetWeenDates,
  queryByNameAndDate,
  sqlTest,
};
