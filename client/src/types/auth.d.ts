interface SigninData {
  name: string;
  password: string;
}
interface RegisterData {
  name: string;
  role: string;
}
interface ForgetPassData {
  name: string;
}
interface resetPassData {
  code: string;
  password: string;
  passwordConfirm: string;
}
interface UpdatePassData {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}
