import { ReactNode, useState } from 'react';
import { Modal } from 'antd';
import { css, cx, keyframes } from '@emotion/css';
import { CloseOutlined } from '@ant-design/icons';

const shake = keyframes`
  10%,
        90% {
          transform: translate3d(-1px, 0, 0);
        }
        20%,
        80% {
          transform: translate3d(2px, 0, 0);
        }
        30%,
        50%,
        70% {
          transform: translate3d(-3px, 0, 0);
        }
        40%,
        60% {
          transform: translate3d(3px, 0, 0);
        }
`;
interface Props {
  open: boolean;
  children: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: boolean;
  width?: number;
  closeIcon?: ReactNode;
  closeIconClass?: string;
  className?: string;
  title?: string;
  centered?: boolean;
}
function OwnModal({
  open,
  onOk,
  onCancel,
  footer,
  width,
  closeIcon,
  closeIconClass,
  className,
  title,
  centered,
  children,
  ...rest
}: Props) {
  const ModalStyles = css`
    background-color: #fff;
    /* box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25); */
    border: 1px solid #707070;

    border-radius: 5px;
    padding: 1.5rem;
    &.warning {
      animation: ${shake} 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      perspective: 1000px;
    }

    .ant-modal-body {
    }

    .ant-modal-header {
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.105);
      .ant-modal-title {
        font-weight: 500;
        font-size: 20px;
        color: #2a2a2a;
        max-inline-size: 85%;
      }
    }

    .ant-modal-close {
      top: ${title ? '1.5rem' : '-1rem'};
      inset-inline-end: ${title ? '2rem' : '-.5rem'};
      /* background-color: rgba(255, 0, 0, 0.1); */
      span {
        line-height: 0;
        svg {
          /* width: 1.5rem; */
        }
      }
    }

    > div {
      background-color: transparent;
      box-shadow: none !important;
    }

    .ant-modal-footer {
      border: none;
    }

    .modal-inner {
    }
  `;

  const [isWarning, setIsWarning] = useState(false);
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={() => {
        if (onCancel) onCancel();
        else {
          setIsWarning(true);
          setTimeout(() => setIsWarning(false), 600);
        }
      }}
      footer={footer || false}
      width={width}
      closable={!!onCancel}
      closeIcon={closeIcon || <CloseOutlined />}
      centered={centered}
      destroyOnClose
      className={cx(ModalStyles, { warning: isWarning })}
      {...rest}
    >
      <div className={className}>
        <div className="inner">{children}</div>
      </div>
    </Modal>
  );
}

export default OwnModal;
