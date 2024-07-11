import { Layout } from 'antd';

const { Content: LayoutContent } = Layout;

export const Content = ({ children }) => (
    <LayoutContent
        className="site-layout-background"
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        {children}
    </LayoutContent>
);
