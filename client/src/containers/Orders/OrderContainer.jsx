'use client';
import { AppLayout } from '@/layouts/AppLayout';
import React, { useState } from 'react';
import { Button, Table, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import {
    createOrderFormFields,
    createSearchOrdersFormFields,
    exportOrderFormFields,
} from '@/forms/formData';
import Form from '@/forms/Form';
import orderService from '@/services/orderService';
import exportService from '@/services/exportService';
import moment from 'moment';
import { Modal } from '@/components/Modal';
import notify from '@/helpers/notify';
import { orderColumns } from '@/data/TableColumns';

const { Title } = Typography;

export const OrderContainer = () => {
    const [isCreateOrderModalVisible, setIsCreateOrderModalVisible] =
        useState(false);
    const [userOptions, setUserOptions] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
    });
    const [orderFilter, setOrderFilter] = useState({});

    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

    const handleSearchOrders = async (values, currentPage) => {
        const newValues = {
            from: values?.startDate,
            to: values?.endDate,
            user: values.user,
            minTotalAmount:
                values.minTotalAmount > 0 ? values.minTotalAmount : undefined,
            maxTotalAmount:
                values.maxTotalAmount > 0 ? values.maxTotalAmount : undefined,
            orderNumber: values.orderNumber,
            page: currentPage ? currentPage : pagination.page,
            pageSize: pagination.pageSize,
        };

        await orderService
            .getFilteredOrders(newValues)
            .then((res) => {
                const { data, total, page, pageSize, totalPages } = res.data;
                setOrders(data);
                setPagination({
                    ...pagination,
                    page,
                    pageSize,
                    totalPages,
                    total,
                });
                const filterValues = { ...newValues, page, pageSize };
                setOrderFilter(filterValues);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const handleSearchUsers = (data) => {
        setUserOptions(data);
    };

    const handleCreateOrder = async (payload) => {
        await orderService
            .createOrder(payload)
            .then((res) => {
                const newOrder = res.data;
                setOrders((prevOrders) => [newOrder, ...prevOrders]);
                setIsCreateOrderModalVisible(false);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const handleExportOrders = async (values) => {
        const payload = { ...orderFilter, ...values };
        await exportService
            .export(payload)
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `orders-export.${values.type}`);

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const pageChangeHandler = async (page) => {
        await handleSearchOrders(orderFilter, page);
    };

    return (
        <AppLayout>
            <Title level={2}>Orders</Title>
            {!isUserLoggedIn ? (
                <Tooltip title="Please login to create an order.">
                    <Button disabled>Create order</Button>
                </Tooltip>
            ) : (
                <Button onClick={() => setIsCreateOrderModalVisible(true)}>
                    Create order
                </Button>
            )}
            <br />
            <br />
            <Form
                onSubmit={handleSearchOrders}
                fields={createSearchOrdersFormFields(isSpinning, userOptions)}
                layout="inline"
                onOkText="Search"
                justifyContent="flex-start"
                onSearch={handleSearchUsers}
            />
            <br />
            <Form
                onSubmit={handleExportOrders}
                fields={exportOrderFormFields()}
                layout="inline"
                onOkText="Export"
                justifyContent="flex-start"
            />
            <br />
            <Table
                rowKey={(record, index) => index}
                columns={orderColumns}
                dataSource={orders}
                pagination={{
                    current: pagination.page,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: false,
                    onChange: (page) => pageChangeHandler(page),
                }}
            />
            {isCreateOrderModalVisible && (
                <Modal
                    isVisible={isCreateOrderModalVisible}
                    title="Login"
                    onClose={() => setIsCreateOrderModalVisible(false)}
                >
                    <Form
                        onSubmit={handleCreateOrder}
                        fields={createOrderFormFields()}
                        layout="vertical"
                        onOkText="Create"
                        onCancelText="Close"
                        onClose={() => setIsCreateOrderModalVisible(false)}
                        justifyContent="flex-end"
                    />
                </Modal>
            )}
        </AppLayout>
    );
};
