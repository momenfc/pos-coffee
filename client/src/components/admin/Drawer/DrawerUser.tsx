import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Drawer, Form, Input, Select, Tooltip } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useUserAdd from 'api-hooks/user/useUserAdd';
import useUserEdit from 'api-hooks/user/useUserEdit';
import { useEffect } from 'react';

interface DrawerUserProps {
  editUser?: User;
  open: boolean;
  setOpen: (status?: any) => void;
}

function DrawerUser({ editUser, open, setOpen }: DrawerUserProps) {
  const [form] = Form.useForm();
  const { userAdd, userAddLod } = useUserAdd();
  const { userEdit, userEditLod } = useUserEdit();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (values: User) => {
    console.log('onFinish  values:', values);
    // return;
    const data = { ...values };

    if (editUser) {
      userEdit({
        userId: editUser._id,
        data,
        onSuc: onClose,
      });
    } else {
      userAdd({ data, onSuc: onClose });
    }
  };

  useEffect(() => {
    if (editUser) {
      form.setFieldsValue({ ...editUser, isResetPassword: false });
    } else {
      form.setFieldsValue({ role: 'user' });
    }
  }, [editUser, form, open]);
  return (
    <Drawer
      title={editUser ? 'Edit user' : 'Add new user'}
      placement="top"
      closable={false}
      // onClose={onClose}
      open={open}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="global-form w-2/3 m-auto"
      >
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter user name',
            },
          ]}
        >
          <Input placeholder="user name" className="global-input" />
        </FormItem>

        <FormItem
          name="role"
          className="flex-1"
          rules={[
            {
              required: true,
              message: 'Please select user role',
            },
          ]}
        >
          <Select
            placeholder="Role"
            className="global-select"
            options={['user', 'lead', 'admin'].map((c: string) => ({
              value: c,
              label: c,
            }))}
          />
        </FormItem>

        {editUser && (
          <FormItem name="isResetPassword" valuePropName="checked">
            <Checkbox className="global-inpu">
              Reset password to default ?{' '}
              <Tooltip title="Default password is: `123456`">
                <InfoCircleOutlined />
              </Tooltip>
            </Checkbox>
          </FormItem>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="primary"
            size="large"
            className="w-32 min-w-max"
            loading={userAddLod || userEditLod}
            htmlType="submit"
          >
            {editUser ? 'Save changes' : 'Add'}
          </Button>
          <Button
            type="primary"
            ghost
            size="large"
            className="w-32 min-w-max"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}

export default DrawerUser;
