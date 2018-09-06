import { Department } from '../department/department.interface';

export interface Member {
  key?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  gender: string;
  phoneNumber?: string;
  email?: string;
  address: string;
  birthDate: string;
  department: Department[];
  status: boolean;
  statusReason?: string;
}
