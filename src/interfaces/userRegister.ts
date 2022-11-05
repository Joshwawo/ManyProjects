export interface UserRegister {
    name: string;
    password: string;
    email: string;
    token: string;
    confirmado: boolean;
    comprobarPassword(password: string): Promise<boolean>;
    credits: number
  }
  
  export interface userIdTypes {
    _id: string;
  }
  