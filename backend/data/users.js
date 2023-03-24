import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    status: 'approved',
  },
  {
    firstName: 'Petar',
    lastName: 'Petrovic',
    email: 'professor@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'professor',
    status: 'approved',
  },
  {
    firstName: 'Luka',
    lastName: 'Pavlovic',
    email: 'student@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
    status: 'approved',
  },
  {
    firstName: 'Marko',
    lastName: 'Markovic',
    email: 'professor1@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'professor',
    status: 'approved',
  },
  {
    firstName: 'Nemanja',
    lastName: 'Nemanjic',
    email: 'student1@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
    status: 'approved',
  },
  {
    firstName: 'Igor',
    lastName: 'Vukovic',
    email: 'student2@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
    status: 'pending',
  },
  {
    firstName: 'Anđela',
    lastName: 'Anđelković',
    email: 'professor3@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'professor',
    status: 'pending',
  },
  {
    firstName: 'Ivana',
    lastName: 'Ivanović',
    email: 'student3@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
    status: 'pending',
  },
];

export default users;
