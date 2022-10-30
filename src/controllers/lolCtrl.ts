import { Request, Response } from "express";
import { fetchAllChamps, fetchSummoner } from "../services/lol.service";

const getChamps = async (req: Request, res: Response) => {
  try {
    const respuesta = await fetchAllChamps();

    res.send(respuesta);
  } catch (error) {
    console.log(error);
  }
};

// export const getUser = async (req, res) => {
//   // const userHashtag = "#QPYJPJ20".toUpperCase().replace("#", "%23");
//   const userHashtag = req.query.userHashtag;
//   const userbyId = await fetchDataByID(userHashtag);
//     console.log(userbyId);
//     console.log('userbyId ruta clash/user');

//   res.json(userbyId);
// };

const getSummoner = async ({ query }: Request, res: Response) => {
  try {
    // const {} = req.params
    //*/ *= %25
    //*/ < = %3C
    //*/ > = %3E
    //*/ # = %23
    //*/ % = %25
    //*/ : = %3A
    //*/ " = %22
    //*/ space = %20

    let expression = ["*", "<", ">", "#", "%", ":", '"', " "];
    let replace = ["%2A", "%3C", "%3E", "%23", "%25", "%3A", "%22", "%20"];
    let summonerName = query.summonerName;
    for (let i = 0; i < expression.length; i++) {
      summonerName = summonerName
        ?.toString()
        .replace(expression[i], replace[i]);
    }

    // console.log(summonerName);

    // const

    // const respuesta = await fetchSummoner(`${summonerName}`);
    const respuesta = await fetchSummoner(String(summonerName));

    res.send(respuesta);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send({
      status: {
        message: "Summoner not found",
        status_code: 404,
      },
      error: {
        error: error,
      },
    });
  }
};

export { getChamps, getSummoner };
