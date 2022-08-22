export interface LoginInterface {
  email: string;
  passwordHash: string;
}

export interface sValueObj {
  search: string;
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

export interface studentObj {
  id: number;
  name: string;
  birth_date: string;
  phone: string;
  institution_id: number;
  address_id: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface institutionObj {
  id: number;
  name: string;
  phone_number: string;
  address_id: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface instObj {
  name: string;
  phone_number: string;
  address_id: number;
}
