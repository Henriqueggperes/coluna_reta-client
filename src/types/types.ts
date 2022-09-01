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
  institutions?:
    | number[]
    | [
        {
          id: string;
          name: string;
          phone_number: string;
          state: string;
          city: string;
          zip_code: string;
          created_at: string;
          updated_at: string;
          deleted: boolean;
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
  historic?: [
    {
      id: number;
      student_id: number;
      visit_date: string;
      forwarding: string;
      cobb_angle: string;
      return_date: string;
      image_1: string;
      image_2: string;
      updated_at: string;
      deleted: boolean;
    }
  ];
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
  id?: number;
  name: string;
  phone_number: string;
  state: string;
  city: string;
  zip_code: string;
  created_at?: string,
  updated_at?: string,
  _count?: string,
  deleted?: boolean;
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
  id?: number;
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

export interface registerPassword {
  passwordHash: string;
  confirmPassword: string;
  recoverPasswordToken?: string;
}

export interface studentHistory {
  id: number;
  student_id: number;
  visit_date: string;
  image_1: string;
  image_2: string;
  forwarding: string;
  cobb_angle: string;
  return_date: string;
  updated_at: string;
  deleted: boolean;
  consultation: consultationType[];
}

export interface consultationType {
  id?: number;
  student_id?: number;
  historic_id?: number;
  clinic: string;
  consultation_date: string;
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}
export interface registerPassword{
  passwordHash: string,
  confirmPassword: string,
  recoverPasswordToken?: string,
}

export interface modalProps {
  isOpen: boolean; 
  closeModal: any; 
  type: string; 
  title: string; 
  btnName: string; 
}
