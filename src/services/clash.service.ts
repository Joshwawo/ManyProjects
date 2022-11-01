import axios from "axios";
import {
  ClashCards,
  UserClash,
  UserChest,
  ClashClan,
} from "../interfaces/clash/clash.interfaces";

import "dotenv/config";

const fetchCards = async () => {
  try {
    const url = "https://proxy.royaleapi.dev/v1/cards";

    const respuesta = await axios.get<ClashCards>(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.API_CLASH}`,
        Accept: "application/json ; charset=utf-8",
      },
    });

    return respuesta.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchPlayer = async (userHashTag: string): Promise<unknown> => {
  
  try {
    const url = `https://proxy.royaleapi.dev/v1/players/${userHashTag}`;

    const respuesta = await axios.get<UserClash>(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.API_CLASH}`,
      },
    });

    return respuesta.data;
  } catch (error:any) {
    const errorReturn = new Error('Player not found')

    // console.log(error);
    return null
  }
};

const fetchUpcomingchests = async (userHashTag: string): Promise<unknown> => {
  try {
    const url = `https://proxy.royaleapi.dev/v1/players/${userHashTag}/upcomingchests`;

    const respuesta = await axios.get<UserChest>(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.API_CLASH}`,
      },
    });

    return respuesta.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchClan = async (clanHashTag: string): Promise<unknown> => {
  try {
    const url = `https://proxy.royaleapi.dev/v1/clans/${clanHashTag}`;

    const respuesta = await axios.get<ClashClan>(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.API_CLASH}`,
      },
    });

    return respuesta.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { fetchCards, fetchPlayer, fetchUpcomingchests, fetchClan };
