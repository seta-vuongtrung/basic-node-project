interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Goon",
    email: "Goon@gmail.com",
  },
  {
    id: 2,
    name: "Tsuki",
    email: "Tsuki@gmail.com",
  },
  {
    id: 3,
    name: "Joe",
    email: "Joe@gmail.com",
  },
];

export default {
  getAllUser(): User[] {
    return users;
  },
  getUserById(id: number): User | undefined {
    return users.find((user) => user.id == id);
  },
};
