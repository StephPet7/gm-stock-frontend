export class UserModel {
  id?: string;
  email: string;
  user_name: string;
  name: string;
  role: 'ADMINISTRATOR' | 'STOREKEEPER' | 'SUPERVISOR';
  is_staff: boolean;
  is_active: boolean;
  password: string;
  addDate: Date;
}
