import bcrypt from "bcryptjs";
// we use hashSync to hash synchronously
// Since this is just data that we are importing,
// It's not like a registration form or something like that

const users = [
  {
    name: "Admin User",
    email: "jovialiste82@yahoo.fr",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
