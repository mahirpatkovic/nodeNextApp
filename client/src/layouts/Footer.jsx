import { Layout } from 'antd';

const { Footer: LayoutFooter } = Layout;

export const Footer = () => (
    <LayoutFooter style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} created by Mahir Patkovic
    </LayoutFooter>
);
