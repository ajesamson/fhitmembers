import { Department } from '../../models/department/department.interface';

const departmentList: Department[] = [
  {name: 'Marketing', status: 1},
  {name: 'Sales', status: 2},
  {name: 'Marketing', status: 3},
  {name: 'Services', status: 4},
  {name: 'Sales', status: 5}
];

export const DEPARTMENT_LIST = departmentList;
