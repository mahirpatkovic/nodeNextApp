'use client';
import { useEffect } from 'react';
import { Layout } from 'antd';
import { Header } from '@/layouts/Header';
import { Sidebar } from '@/layouts/Sidebar';
import { Content } from '@/layouts/Content';
import { Footer } from '@/layouts/Footer';
import authService from '@/services/authService';
import { authActions } from '@/store/auth';
import { useDispatch } from 'react-redux';
import notify from '@/helpers/notify';

export const AppLayout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        isUserAuthenticated();
    }, []);

    const isUserAuthenticated = async () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            await authService
                .checkIsAuthenticated()
                .then((res) => {
                    dispatch(authActions.login());
                    dispatch(authActions.setCurrentUser(res.data));
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
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout>
                <Sidebar />
                <Layout style={{ padding: '0 24px' }}>
                    <Content>{children}</Content>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
