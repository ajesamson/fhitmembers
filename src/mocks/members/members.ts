import { Member } from '../../models/member/member.interface';
import { DEPARTMENT_LIST } from '../departments/departments';
import {Department} from "../../models/department/department.interface";

const departmentList: Department[] = DEPARTMENT_LIST;

const memberList: Member[] = [{
  firstName: 'Kalie',
  lastName: 'McVaugh',
  avatar: 'http://robohash.org/explicabodictaeos.jpg?size=50x50&set=set1',
  gender: 'Female',
  phoneNumber: '8122554550',
  email: 'kmcvaugh0@pbs.org',
  address: '890 Meadow Valley Terrace',
  birthDate: '2016-06-27',
  department: [departmentList[0], departmentList[1]],
  status: true,
}, {
  firstName: 'Elbert',
  lastName: 'Kinchington',
  avatar: 'https://robohash.org/animiearumrerum.png?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '4472617440',
  email: 'ekinchington1@google.it',
  address: '72510 Carey Way',
  birthDate: '2016-04-13',
  department: [departmentList[0]],
  status: false,
  statusReason: 'Toxic effect of phosphorus and its compounds, undet, sequela'
}, {
  firstName: 'Thaddeus',
  lastName: 'Bosch',
  avatar: 'https://robohash.org/cumoditvelit.jpg?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '2866982072',
  email: 'tbosch2@fc2.com',
  address: '4 Morningstar Plaza',
  birthDate: '2017-03-05',
  department: [departmentList[3]],
  status: true
}, {
  firstName: 'Collin',
  lastName: 'Gowanlock',
  avatar: 'https://robohash.org/quisquamsolutamagni.png?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '6507488478',
  email: 'cgowanlock3@icq.com',
  address: '0904 Mendota Court',
  birthDate: '2017-04-06',
  department: [departmentList[2]],
  status: true
}, {
  firstName: 'Sigismond',
  lastName: 'Marval',
  avatar: 'https://robohash.org/quisedconsequatur.jpg?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '9971889585',
  email: 'smarval4@myspace.com',
  address: '53111 Lukken Alley',
  birthDate: '2017-02-09',
  department: [departmentList[0]],
  status: true
}, {
  firstName: 'Kathy',
  lastName: 'Purveys',
  avatar: 'https://robohash.org/dictaconsequunturperspiciatis.jpg?size=50x50&set=set1',
  gender: 'Female',
  phoneNumber: '8151120024',
  email: 'kpurveys5@whitehouse.gov',
  address: '3 Susan Terrace',
  birthDate: '2015-10-27',
  department: [departmentList[1]],
  status: true
}, {
  firstName: 'Lari',
  lastName: 'Draper',
  avatar: 'https://robohash.org/quodoloresed.jpg?size=50x50&set=set1',
  gender: 'Female',
  phoneNumber: '8686084652',
  email: 'ldraper6@oaic.gov.au',
  address: '9311 Memorial Junction',
  birthDate: '2017-10-20',
  department: [departmentList[0]],
  status: true
}, {
  firstName: 'Althea',
  lastName: 'Spoors',
  avatar: 'https://robohash.org/similiqueeaporro.bmp?size=50x50&set=set1',
  gender: 'Female',
  phoneNumber: '7661338784',
  email: 'aspoors7@geocities.jp',
  address: '2 Alpine Alley',
  birthDate: '2015-11-25',
  department: [departmentList[4]],
  status: true
}, {
  firstName: 'Somerset',
  lastName: 'Gamlen',
  avatar: 'https://robohash.org/quiaquiaa.png?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '6859892873',
  email: 'sgamlen8@discovery.com',
  address: '96806 Declaration Crossing',
  birthDate: '2017-12-01',
  department: [departmentList[3]],
  status: true
}, {
  firstName: 'Ron',
  lastName: 'Pickle',
  avatar: 'https://robohash.org/quireiciendistotam.jpg?size=50x50&set=set1',
  gender: 'Male',
  phoneNumber: '4781279447',
  email: 'rpickle9@sbwire.com',
  address: '85197 Cherokee Avenue',
  birthDate: '2018-02-03',
  department: [departmentList[0]],
  status: false,
  statusReason: 'Disp fx of body of scapula, left shoulder, init for clos fx'
}];

export const MEMBER_LIST = memberList;
