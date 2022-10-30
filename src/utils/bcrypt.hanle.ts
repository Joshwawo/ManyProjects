import { hash, compare } from "bcryptjs";

const encrypt = async (pwdPlane: string): Promise<string> => {
  const passwordHash = await hash(pwdPlane, 10);
  return passwordHash;
};

const verified = async (pwdPlane:string, pwdHash:string):Promise <boolean> => {
    const isCorrect = await compare(pwdPlane, pwdHash);
    return isCorrect;
};

export { encrypt, verified };
