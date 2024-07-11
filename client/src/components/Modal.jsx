import { Modal as AntModal } from 'antd';

export const Modal = ({ children, title, isVisible, onClose }) => {
    return (
        <AntModal
            title={title}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            {children}
        </AntModal>
    );
};
