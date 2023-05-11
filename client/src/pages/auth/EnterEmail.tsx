import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Navigate, useParams } from 'react-router-dom';
import useAuth from 'api-hooks/auth/useAuth';
import AuthFrame from './AuthFrame';

function EnterEmail() {
  const { action } = useParams();
  console.log('EnterEmail  action:', action);
  const isForgetPassword = action === 'forget-pawword';

  const { forgetPass, authLoading } = useAuth();

  const handleForgetPass = (values: ForgetPassData) => {
    console.log('handleForgetPass  values:', values);
    forgetPass(values);
  };

  if (!isForgetPassword) return <Navigate to="/login" replace />;
  return (
    <AuthFrame
      title={isForgetPassword ? 'Enter your email to rest password' : ''}
    >
      <Form onFinish={handleForgetPass} className="global-form" size="large">
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
        <Button
          type="primary"
          block
          size="large"
          htmlType="submit"
          loading={authLoading}
        >
          {isForgetPassword && 'Send me code'}
        </Button>
      </Form>
    </AuthFrame>
  );
}

export default EnterEmail;
