export interface PasswordRecord {
    id: number;
  name: string;
  password: string;
  type: 'site' | 'email'; 
  dateCreated: Date; 
  isPasswordVisible: boolean; 
}
