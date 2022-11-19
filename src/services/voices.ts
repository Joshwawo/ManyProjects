import axios from "axios";
import voicesModel from "../models/voicesModel";

type bodyVoices = {
  tts: string | undefined;
  voice: string;
  pace: number;
  duration: number; //TODO: cambiar a array de numeros
  pitch: number;
  voicemodel_uuid: string;
};

interface VoicesGet {
  failed_at: string | null;
  finished_at: string | null;
  meta: string | null;
  path: string | null;
  started_at: string | null;
  uuid: string | null;
  tts: string | undefined;
}

const listVoicesServices = async (language: any, mode: string) => {
  let realUrl;
  realUrl = `https://api.uberduck.ai/voices?mode=${mode}`;
  if (language === "undefined") {
    realUrl = `https://api.uberduck.ai/voices?mode=${mode}`;
  } else {
    realUrl = `https://api.uberduck.ai/voices?mode=${mode}&language=${language}`;
  }
  const options = {
    method: "GET",
    url: realUrl,
    headers: {
      accept: "application/json",
      authorization: `Basic ${process.env.API_KEY_UBERDUCK}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const resSpeechServices = async (body: bodyVoices) => {
  const { tts, voice, pace, duration, pitch, voicemodel_uuid } = body;
  console.log(voicemodel_uuid);
  const postSpeech = async () => {
    const options = {
      method: "POST",
      url: "https://api.uberduck.ai/speak",
      headers: {
        accept: "application/json",
        "uberduck-id": "anonymous",
        "content-type": "application/json",
        authorization: `Basic ${process.env.API_KEY_UBERDUCK}`,
      },
      data: {
        voice: voice,
        pace: 1,
        speech: tts,
        // duration: [100],
        // pitch: [100],
        // voicemodel_uuid: 'd1bee776-ae8a-496f-bfb7-84b2e63679db',
      },
    };
    try {
      const response = await axios.request(options);
      return {
        res: response.data,
        tss: tts,
      };
    } catch (error) {
      console.error(error);
    }
  };
  
  //!OBTENGO LA VOZ DEL POST DE SPEECH
  const getSpeech = async (uuid: string | null, tss:string | undefined) => {
    // let resultTss ='By default, ReactPlayer supports many different types of url. If you only ever use one type, use imports such as react-player/youtube to reduce your bundle size. See config keys for all player keys.'
    const url = `https://api.uberduck.ai/speak-status?uuid=${uuid}`;
    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });
    const res =  response.data;
    response.data.tss = tss
    
    return res;
  };
  const respuestaPost = await postSpeech();
  const uuid = respuestaPost?.res?.uuid;
  const tss = respuestaPost?.tss

  let respuestaGet;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      respuestaGet = await getSpeech(uuid,tss);
      let datasaved: VoicesGet = {
        failed_at: respuestaGet.failed_at,
        finished_at: respuestaGet.finished_at,
        meta: respuestaGet.meta,
        path: respuestaGet.path,
        started_at: respuestaGet.started_at,
        uuid: uuid,
        tts: respuestaPost?.tss,
      };
      const voices = new voicesModel(datasaved);
      await voices.save();
      // const voicesSaved =

      resolve(respuestaGet);
    }, 10000);
  });
};

const testo = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hola desde testo");
    }, 10000);
  });
};

export { resSpeechServices, testo, listVoicesServices };

//   setTimeout(async () => {
//     //you have better options than this?
//     respuestaGet = await getSpeech(uuid);
//     console.log(respuestaGet);
//     // como puedo retornar el valor de respuestaGet?
//     // return respuestaGet
//     return respuestaGet;
//   }, 5000);
//   return new Promise((resolve, reject) => {
//     const interval = setInterval(async () => {
//       respuestaGet = await getSpeech(uuid);
//       console.log(uuid + "Desde la linea 58");
//       console.log(respuestaGet);

//       if (respuestaGet === "done") {
//         clearInterval(interval);
//         resolve(respuestaGet);
//       }
//     }, 5000);
//   });

//   como puedo retornar el valor de respuestaGet?
