export interface LoginInterface {
  email: string;
  passwordHash: string;
}

export interface sValueObj {
  search: string;
  filter: string;
}

export interface userObj {
  id?: number;
  created_at?: string;
  deleted?: boolean;
  recoverPasswordToken?: string;
  passwordHash?: string;
  email: string;
  institution_id?: number[] | any;
  institutions?: [
        {
          name?: string;
          id?: number;
        }
      ];
  name: string;
  role: string;
  updated_at?: string;
}

export interface studentObj {
  id?: number;
  name: string;
  birth_date: string;
  phone: string;
  institution_id: number;
  address_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
  institution?: {
    id?: number;
    name?: string;
  };
  address?: {};
}

export interface institutionObj {
  id?: number;
  name: string;
  phone_number: string;
  address_id?: number | any;
  address?: [
    {
      id: number;
      city: string;
      complement: string;
      neighborhood: string;
      number: string;
      state: string;
      street: string;
      zip_code: string;
      created_at?: string;
      updated_at?: string;
      deleted?: boolean;
    }
  ];
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
  _count?: string;
}

export interface postInstitutionObj {
  name: string;
  phone_number: string;
  address_id?: number | any;
}

export interface patchStudentObj {
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

export interface addressType {
  id: number;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zip_code: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}
export interface registerPassword{
  passwordHash: string,
  confirmPassword: string,
  recoverPasswordToken?: string,
}
