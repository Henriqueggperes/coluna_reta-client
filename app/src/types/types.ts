export interface LoginInterface {
  email: string;
  passwordHash: string;
}

export interface sValueObj {
  search: string;
}

export interface studentObj {
  id: number; //**  MUDAR PARA STRING DEPOIS ( VAI RECEBER UM ID HASH ) **
  name: string;
  birth_date: string;
  phone: number;
  institution: string;
}