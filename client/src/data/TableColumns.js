import moment from 'moment';

export const orderColumns = [
    {
        title: 'Order Number',
        dataIndex: 'order_number',
        key: 'order_number',
    },
    {
        title: 'Customer',
        render: (value) => value?.user?.username,
    },
    {
        title: 'Total Amount',
        dataIndex: 'total_amount',
        key: 'total_amount',
    },
    {
        title: 'Order Date',
        dataIndex: 'order_date',
        key: 'order_date',
        render: (value) => moment(value).format('DD.MM.YYYY. HH:mm'),
    },
];
