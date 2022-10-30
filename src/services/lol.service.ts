import axios from "axios";
import { LolChamps, Summoner } from "../interfaces/lol/champs.interfaces";

const fetchAllChamps = async (): Promise<LolChamps> => {
  const url =
    "http://ddragon.leagueoflegends.com/cdn/12.15.1/data/en_US/champion.json";

  const respuesta = await axios.get<LolChamps>(url);

  return respuesta.data;
};

const fetchSummoner = async (summonerName: string):Promise<Summoner> => {
  
    const url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

    const respuesta = await axios.get<Summoner>(url, {
      headers: {
        "X-Riot-Token": "RGAPI-543a23aa-b2fd-45fd-88a1-47e90895673f",
      },
    });

    return respuesta.data;
  
};

export { fetchAllChamps, fetchSummoner };
