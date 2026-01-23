export interface RegisterInput  {
  email: string;
  password: string;
  name?: string;
  lastname?: string;
  city?: string;
};

export interface LoginInput  {
  email: string;
  password: string;
};