import { useState } from 'react';
import { Button, Dropdown, Flex, Layout } from 'antd';
import Form from '@/forms/Form';
import { Modal } from '@/components/Modal';
import authService from '@/services/authService';
import { authActions } from '@/store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginFormFields, registerFormFields } from '@/forms/formData';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import notify from '@/helpers/notify';
import { useRouter } from 'next/navigation';

const { Header: LayoutHeader } = Layout;

export const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('login');

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const openRegisterModal = () => {
        setIsModalVisible(true);
        setModalContent('register');
    };

    const openLoginModal = () => {
        setIsModalVisible(true);
        setModalContent('login');
    };

    const authenticateUser = async (values) => {
        if (modalContent === 'login') {
            return await authService.login(values);
        }

        return await authService.register(values);
    };

    const handleSubmit = async (values) => {
        await authenticateUser(values)
            .then((res) => {
                dispatch(authActions.login());
                dispatch(authActions.setCurrentUser(res.data));
                localStorage.setItem('isLoggedIn', 'true');
                setIsModalVisible(false);
            })
            .catch((err) => {
                notify(
                    err.response || {
                        data: {
                            status: 'error',
                            message: 'Authentication failed',
                        },
                    },
                );
            });
    };

    const handleLogout = async () => {
        await authService
            .logout()
            .then(() => {
                localStorage.removeItem('isLoggedIn');
                dispatch(authActions.logout());
                router.push('/');
            })
            .catch((err) => {
                notify(
                    err.response || {
                        data: { status: 'error', message: 'Logout failed' },
                    },
                );
            });
    };

    const items = [
        {
            label: 'Logout',
            icon: <LogoutOutlined />,
            key: '1',
            onClick: handleLogout,
        },
    ];

    const renderButtons = () => {
        if (isAuthenticated) {
            return (
                <Dropdown.Button
                    menu={{ items }}
                    trigger={['click']}
                    overlayStyle={{ position: 'fixed' }}
                    icon={<DownOutlined />}
                    style={{ position: 'absolute', left: '90%' }}
                >
                    {currentUser?.username}
                </Dropdown.Button>
            );
        }

        return (
            <>
                <Button onClick={openRegisterModal}>Register</Button>
                <Button onClick={openLoginModal}>Login</Button>
            </>
        );
    };

    return (
        <LayoutHeader style={{ background: '#ffffff', padding: '15px' }}>
            <Flex gap={10} justify="flex-end">
                {renderButtons()}
            </Flex>
            {isModalVisible && (
                <Modal
                    isVisible={isModalVisible}
                    onOk={handleSubmit}
                    title={modalContent === 'login' ? 'Login' : 'Register'}
                    onClose={() => setIsModalVisible(false)}
                >
                    <Form
                        onSubmit={handleSubmit}
                        fields={
                            modalContent === 'login'
                                ? loginFormFields()
                                : registerFormFields()
                        }
                        layout="vertical"
                        onOkText={
                            modalContent === 'login' ? 'Login' : 'Register'
                        }
                        onCancelText="Close"
                        onClose={() => setIsModalVisible(false)}
                        justifyContent="flex-end"
                    />
                </Modal>
            )}
        </LayoutHeader>
    );
};
