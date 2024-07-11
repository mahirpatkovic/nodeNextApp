import React, { useEffect, useState } from 'react';
import { Button, Flex, Form as AntForm, Space, Tooltip } from 'antd';
import { FormField } from '@/forms/FormField';

const Form = ({
    fields,
    onSubmit,
    layout,
    onOkText,
    onCancelText,
    onClose,
    justifyContent,
    disabledOkButton,
    disabledButtonTooltip,
    onSearch,
    resetFormRef,
}) => {
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    useEffect(() => {
        if (resetFormRef) {
            resetForm();
        }
    }, [resetFormRef]);

    const handleSubmit = (values) => {
        onSubmit(values);
    };

    const handleOnSearch = (data) => {
        onSearch(data);
    };

    return (
        <AntForm onFinish={handleSubmit} layout={layout}>
            {fields.map((field, index) => (
                <FormField
                    key={index}
                    {...field}
                    value={formData[field.name]}
                    onChange={(field) => handleChange(field.name, field.value)}
                    onSearch={handleOnSearch}
                />
            ))}
            <Flex justify={justifyContent}>
                <Space size="small">
                    {onCancelText && (
                        <Button onClick={onClose}>{onCancelText}</Button>
                    )}
                    {disabledOkButton ? (
                        <Tooltip title={disabledButtonTooltip}>
                            <Button disabled>{onOkText}</Button>
                        </Tooltip>
                    ) : (
                        <Button type="primary" htmlType="submit">
                            {onOkText}
                        </Button>
                    )}
                </Space>
            </Flex>
        </AntForm>
    );
};

export default Form;
