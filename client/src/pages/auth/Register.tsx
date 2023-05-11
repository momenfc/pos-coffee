import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link } from 'react-router-dom';
import useAuth from 'api-hooks/auth/useAuth';
import AuthFrame from './AuthFrame';

function Register() {
  const { register, authLoading } = useAuth();
  const handleRegister = (values: RegisterData) => {
    console.log('handleRegister  values:', values);
    register(values);
  };
  return (
    <AuthFrame title="Create new account">
      <Form
        onFinish={handleRegister}
        className="global-form"
        size="large"
        layout="vertical"
      >
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
        <FormItem
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
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
          Create account
        </Button>
      </Form>
      <div className="py-4 text-end">
        Or{' '}
        <Link to="/login" className="text-blue-500">
          login now!
        </Link>
      </div>
    </AuthFrame>
  );
}

export default Register;
