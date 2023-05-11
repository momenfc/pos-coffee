interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  data: User | null;
}
