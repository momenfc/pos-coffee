import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function BtnBack() {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      ghost
      icon={<ArrowLeftOutlined />}
      className="flex items-center "
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
}

export default BtnBack;
