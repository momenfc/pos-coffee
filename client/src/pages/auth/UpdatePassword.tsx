import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useAuth from 'api-hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthFrame from './AuthFrame';

function UpdatePassword() {
  const navigate = useNavigate();
  const { updatePass, authLoading } = useAuth();
  const handleRegister = (values: UpdatePassData) => {
    console.log('handleRegister  values:', values);
    updatePass(values);
  };
  return (
    <AuthFrame title="Enter the data to update your password">
      <Form
        onFinish={handleRegister}
        className="global-form"
        size="large"
        layout="vertical"
        validateTrigger="onFinish"
      >
        <FormItem
          name="currentPassword"
          rules={[
            {
              required: true,
              message: 'Please enter your current password',
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Current Password"
            className="global-input"
          />
        </FormItem>
        <FormItem
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please enter new password',
            },
          ]}
        >
          <Input.Password
            placeholder="Enter New Password"
            className="global-input"
          />
        </FormItem>
        <FormItem
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: 'Please confirm new password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
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
            placeholder="Confirm New Password"
            className="global-input"
          />
        </FormItem>
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="primary"
            block
            size="large"
            className="col-span-2"
            htmlType="submit"
            loading={authLoading}
          >
            Update password
          </Button>
          <Button
            type="primary"
            ghost
            block
            size="large"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </AuthFrame>
  );
}

export default UpdatePassword;
