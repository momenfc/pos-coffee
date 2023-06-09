import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useAuth from 'api-hooks/auth/useAuth';
import AuthFrame from './AuthFrame';

function Login() {
  const { signin, authLoading } = useAuth();

  const handleLogin = (values: SigninData) => {
    console.log('handleLogin  values:', values);
    signin(values);
  };
  return (
    <AuthFrame title="Login to your account">
      <Form onFinish={handleLogin} className="global-form" size="large">
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        >
          <Input placeholder="Enter Name" className="global-input" />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            className="global-input"
          />
        </FormItem>
        <Button
          type="primary"
          block
          size="large"
          htmlType="submit"
          loading={authLoading}
        >
          Login
        </Button>
      </Form>
    </AuthFrame>
  );
}

export default Login;
