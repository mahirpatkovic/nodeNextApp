import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { routeMapping, SidebarMenuItems } from '@/data/SidebarMenuItems';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

export const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const router = useRouter();

    const handleMenuClick = (e) => {
        const routePath = routeMapping[parseInt(e.key)];
        if (routePath) {
            router.push(routePath);
        }
        setSelectedKey(e.key);
    };


    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                selectedKeys={[selectedKey]}
                style={{ height: '100%', borderRight: 0 }}
                items={SidebarMenuItems}
                onClick={handleMenuClick}
            />
        </Sider>
    );
};
