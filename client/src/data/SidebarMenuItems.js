import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons';

export const SidebarMenuItems = [
    {
        key: 1,
        label: 'Blog',
        icon: <UserOutlined />,
    },
    {
        key: 2,
        label: 'Orders',
        icon: <LaptopOutlined />,
    },
    {
        key: 3,
        label: 'Scheduler',
        icon: <NotificationOutlined />,
    },
];

export const routeMapping = {
    1: '/',
    2: '/orders',
    3: '/scheduler',
};
