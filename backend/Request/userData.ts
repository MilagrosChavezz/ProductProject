

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  role?:string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user'; 
  address: string;
}


