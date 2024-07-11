import ReduxProvider from '@/hoc/ReduxProvider';

export const withPage = (component) => {
    const Component = component;
    return (props) => (
        <ReduxProvider>
            <Component {...props} />
        </ReduxProvider>
    );
};
