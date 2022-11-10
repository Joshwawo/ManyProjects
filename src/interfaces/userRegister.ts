export interface UserRegister {
    name: string;
    password: string;
    email: string;
    token: string;
    confirmado: boolean;
    comprobarPassword(password: string): Promise<boolean>;
    credits: number
    isAdmin: boolean
  }
  
  export interface userIdTypes {
    _id: string;
  }
  