export interface PasswordRecordCreateDto {    
  name: string;
  password: string;
  type: 'site' | 'email';   
}
