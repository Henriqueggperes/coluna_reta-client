export interface LoginInterface {
  email: string;
  passwordHash: string;
}

export interface userObj {
  created_at: string;
  deleted: boolean;
  email: string;
  id: number;
  name: string;
  role: string;
  updated_at: string;
}

export interface sValueObj {
  search: string;
}

export interface studentObj {
  id: number;
  name: string;
  birth_date: string;
  phone: number;
  institution: string;
}

export interface instObj {
  name: string;
  phone_number: string;
  address_id: number;
}
