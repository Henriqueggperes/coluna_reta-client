export interface LoginInterface {
  email: string;
  passwordHash: string;
}

export interface sValueObj {
  search: string;
}

export interface userObj {
  created_at?: string;
  deleted?: boolean;
  email: string;
  id: number;
  institution_id:number;
  name: string;
  role: string;
  updated_at?: string;
}

export interface studentObj {
  id: number|any ;
  name: string;
  birth_date: string;
  phone: string;
  institution_id: number;
  address_id?: number|any;
  created_at?: string|any;
  updated_at?: string|any;
  deleted?: boolean|any;
  institution?: {};
  address?: {};
}

export interface institutionObj {
  id: number;
  name: string;
  phone_number: string;
  address_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}

export interface patchStudentObj{
  name: string;
  birth_date: string;
  phone: string;
  institution_id: number;
}

export interface MetaType {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  itemCount?: number;
  orderByColumn?: string;
  page: number;
  pageCount: number;
  take: number;
}