import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useAuth from 'api-hooks/auth/useAuth';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import AuthFrame from './AuthFrame';

function ResetPassword() {
  const [otp, setOtp] = useState('');

  const { resetPass, authLoading } = useAuth();
  const handleRegister = (values: resetPassData) => {
    console.log('handleRegister  values:', values);
    resetPass(values);
  };
  return (
    <AuthFrame title="Enter the data to reset your password">
      <Form
        onFinish={handleRegister}
        className="global-form"
        size="large"
        layout="vertical"
        validateTrigger="onFinish"
      >
        <FormItem
          name="code"
          rules={[
            {
              required: true,
              message: 'Please enter secret code',
            },
            {
              len: 6,
              message: 'Secret code length must be 6 characters',
            },
          ]}
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            // renderSeparator={<span>-</span>}
            containerStyle={{
              gap: 5,
            }}
            renderInput={props => (
              <input
                {...props}
                className="flex-1 h-14 text-2xl border rounded"
              />
            )}
          />
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
          Reset password
        </Button>
      </Form>
    </AuthFrame>
  );
}

export default ResetPassword;
