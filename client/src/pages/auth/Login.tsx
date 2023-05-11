import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link } from 'react-router-dom';
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
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
          ]}
        >
          <Input placeholder="Enter Email" className="global-input" />
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
      <div className="py-4 text-end">
        Or{' '}
        <Link to="/register" className="text-blue-500">
          register now!
        </Link>
      </div>
      <div className="text-">
        <Link to="/enter-email/forget-pawword" className="text-slate-400">
          Foret password!
        </Link>
      </div>
    </AuthFrame>
  );
}

export default Login;
