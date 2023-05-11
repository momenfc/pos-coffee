interface SigninData {
  email: string;
  password: string;
}
interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
interface ForgetPassData {
  email: string;
}
interface resetPassData {
  code: string;
  password: string;
  passwordConfirm: string;
}
