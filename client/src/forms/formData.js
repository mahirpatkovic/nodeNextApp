import { Spin } from 'antd';
import moment from 'moment';

export const loginFormFields = () => [
    {
        value: '',
        type: 'text',
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        required: true,
        maxLength: '35',
        rules: [
            {
                required: true,
                message: 'Please enter username',
            },
        ],
    },
    {
        value: '',
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
        maxLength: '35',
        rules: [
            {
                required: true,
                message: 'Please enter password',
            },
        ],
    },
];

export const registerFormFields = () => [
    {
        value: '',
        type: 'text',
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        required: true,
        maxLength: '35',
        rules: [
            {
                required: true,
                message: 'Please enter username',
            },
        ],
    },
    {
        value: '',
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true,
        maxLength: '35',
        rules: [
            {
                required: true,
                message: 'Please enter your email',
            },
            {
                type: 'email',
                message: 'Please enter a valid email',
            },
        ],
    },
    {
        value: '',
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
        maxLength: '35',
        rules: [
            {
                required: true,
                message: 'Please enter password',
            },
        ],
    },
];

export const createCommentFormFields = () => [
    {
        value: '',
        type: 'textarea',
        name: 'content',
        label: 'Comment',
        placeholder: 'Please enter a comment',
        required: true,
        maxLength: '300',
        rules: [
            {
                required: true,
                message: 'Please enter a comment',
            },
        ],
    },
];

export const createPostFormFields = () => [
    {
        value: '',
        type: 'text',
        name: 'title',
        label: 'Title',
        placeholder: 'Please enter a title',
        required: true,
        maxLength: '100',
        rules: [
            {
                required: true,
                message: 'Please enter a title',
            },
        ],
    },
    {
        value: '',
        type: 'textarea',
        name: 'content',
        label: 'Comment',
        placeholder: 'Please enter a comment',
        required: true,
        maxLength: '300',
        rules: [
            {
                required: true,
                message: 'Please enter a comment',
            },
        ],
    },
];

export const createSearchOrdersFormFields = (isSpinning, userOptions) => [
    {
        type: 'date',
        name: 'startDate',
        // label: 'Date Range',
        placeholder: 'Select date',
        showTime: false,
        style: { width: '100%' },
    },
    {
        type: 'date',
        name: 'endDate',
        showTime: false,
        // label: 'Date Range',
        placeholder: 'Select date',
        style: { width: '100%' },
    },
    {
        type: 'select',
        name: 'user',
        // label: 'User',
        placeholder: 'Select User',
        showSearch: true,
        notFoundContent: isSpinning && <Spin size="small" />,
        options: userOptions,
        style: { marginLeft: 15 },
    },
    {
        type: 'text',
        name: 'orderNumber',
        // label: 'Order Number',
        placeholder: 'Order number',
        maxLength: '100',
        style: { marginLeft: 15 },
    },
    {
        type: 'number',
        name: 'minTotalAmount',
        value: 0,
        // label: 'Min Total Price',
        placeholder: 'Min Total Amount',
        style: { width: '100%', marginLeft: 15 },
    },
    {
        type: 'number',
        name: 'maxTotalAmount',
        value: 0,
        // label: 'Max Total Price',
        placeholder: 'Max Total Amount',
        style: { width: '100%', marginLeft: 15 },
    },
];

export const createOrderFormFields = () => [
    {
        value: '',
        type: 'number',
        name: 'total_amount',
        label: 'Total Amount',
        placeholder: 'Enter total amount',
        required: true,
        rules: [
            {
                required: true,
                message: 'Please enter the total amount',
            },
        ],
        style: { width: '100%' },
    },
];

export const exportOrderFormFields = () => [
    {
        type: 'select',
        name: 'type',
        placeholder: 'Select Export Type',
        rules: [
            {
                required: true,
                message: 'Please select an export type',
            },
        ],
        options: [
            { value: 'xlsx', label: 'XLSX' },
            { value: 'xml', label: 'XML' },
        ],
        style: { marginRight: 15 },
    },
];

export const createTaskFormFields = () => [
    {
        type: 'text',
        name: 'title',
        label: 'Task title',
        placeholder: 'Title',
        rules: [
            {
                required: true,
                message: 'Please enter task title',
            },
        ],
    },
    {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        placeholder: 'Description',
        rows: 2,
        className: 'expandWidthClass',
        rules: [
            {
                required: true,
                message: 'Please enter description',
            },
        ],
    },
];

const disabledHours = () => {
    return [...Array(24).keys()].filter((hour) => hour < 6 || hour >= 21);
};

const disabledMinutes = (selectedHour) => {
    if (selectedHour === 20) {
        return [...Array(60).keys()].filter((minute) => minute > 0);
    }
    return [...Array(60).keys()].filter(
        (minute) => ![0, 15, 30, 45].includes(minute),
    );
};

export const updateTaskFormFields = (event, onDelete) => [
    {
        type: 'text',
        name: 'title',
        label: 'Task title',
        placeholder: 'Title',
        rules: [
            {
                required: true,
                message: 'Please enter task title',
            },
        ],
        value: event.title,
    },
    {
        type: 'textarea',
        name: 'description',
        label: 'Description',
        placeholder: 'Description',
        rows: 2,
        className: 'expandWidthClass',
        rules: [
            {
                required: true,
                message: 'Please enter description',
            },
        ],
        value: event.description,
    },
    {
        type: 'date',
        name: 'startDate',
        label: 'Start date',
        placeholder: 'Select start date',
        rules: [
            {
                required: true,
                message: 'Please enter start date',
            },
        ],
        value: event.start,
        disabledHours,
        disabledMinutes,
        showTime: true,
        style: { width: '100%' },
    },
    {
        type: 'date',
        name: 'endDate',
        label: 'End date',
        placeholder: 'Select end date',
        rules: [
            {
                required: true,
                message: 'Please enter end date',
            },
        ],
        value: event.end,
        disabledHours,
        disabledMinutes,
        showTime: true,
        style: { width: '100%' },
    },
    {
        type: 'button',
        actionName: 'Delete',
        btnTypes: ['danger'],
        action: () => onDelete(),
    },
];
