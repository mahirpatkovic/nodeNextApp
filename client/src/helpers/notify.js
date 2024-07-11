import { notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const notify = (payload) => {
    console.log(payload);
    const type = payload.data?.status === 'success' ? 'success' : 'error';
    const status = type === 'success' ? 'Success' : 'Error';
    const description =
        payload.data?.message ||
        'The connection to the server is not established';

    notification.open({
        message: status,
        description: description,
        duration: 5,
        placement: 'top',
        icon:
            type === 'success' ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
            ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
            ),
    });
};

export default notify;
