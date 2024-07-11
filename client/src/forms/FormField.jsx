import React, { useRef } from 'react';
import {
    Checkbox,
    Input,
    Select,
    Form,
    DatePicker,
    InputNumber,
    Button,
} from 'antd';
import { debouncedSearchUserOptions } from '@/utils/searchUser';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
export const FormField = (props) => {
    const ref = useRef();

    const {
        type,
        placeholder,
        options,
        label,
        value,
        name,
        onChange,
        onSearch,
        maxLength,
        rules,
        action,
        actionName,
        btnTypes,
        disabledDate,
        disabledHours,
        disabledMinutes,
        showTime,
    } = props;

    const onChangeValue = (value) => {
        return onChange({ ...props, value });
    };

    const onChangeSelectValue = (selectValue, option) => {
        const value = props.showSearch ? option.userId : selectValue;
        return onChange({ ...props, value, ref });
    };

    const onSearchUserOptions = async (value) => {
        const users = await debouncedSearchUserOptions(value);
        onSearch(users);
    };

    const renderInput = () => (
        <Form.Item label={label} name={name} rules={rules} initialValue={value}>
            <Input
                ref={ref}
                {...props}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                maxLength={maxLength}
                style={props.style}
            />
        </Form.Item>
    );

    const renderInputNumber = () => (
        <Form.Item label={label} name={name} rules={rules}>
            <InputNumber
                ref={ref}
                {...props}
                placeholder={placeholder}
                value={value}
                onChange={(value) => onChangeValue(value)}
                step={0.5}
                style={props.style}
            />
        </Form.Item>
    );

    const renderPassword = () => (
        <Form.Item label={label} name={name} rules={rules}>
            <Input.Password
                ref={ref}
                {...props}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                maxLength={maxLength}
            />
        </Form.Item>
    );

    const renderTextarea = () => (
        <Form.Item label={label} name={name} rules={rules} initialValue={value}>
            <TextArea
                ref={ref}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
            />
        </Form.Item>
    );

    const renderSelect = () => (
        <Form.Item label={label} name={name} rules={rules}>
            <Select
                ref={ref}
                placeholder={placeholder}
                options={options}
                onSearch={onSearchUserOptions}
                onChange={onChangeSelectValue}
                showSearch={props?.showSearch}
                notFoundContent={props.notFoundContent}
                getPopupContainer={(trigger) => trigger.parentNode}
                style={props.style}
            />
        </Form.Item>
    );

    const renderCheckbox = () => (
        <Checkbox value={value} onChange={onChangeValue} ref={ref} />
    );

    const renderDateRange = () => (
        <RangePicker
            format="DD.MM.YYYY"
            value={value}
            onChange={onChangeValue}
        />
    );

    const renderDatePicker = () => (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            initialValue={dayjs(value)}
        >
            <DatePicker
                format={`DD.MM.YYYY ${showTime ? 'HH:mm' : ''}`}
                placeholder={placeholder}
                disabledDate={disabledDate}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                showTime={showTime}
                onChange={onChangeValue}
                style={props.style}
            />
        </Form.Item>
    );

    const renderButton = () => (
        <Button onClick={action} ref={ref} danger={btnTypes.includes('danger')}>
            {actionName}
        </Button>
    );

    const renderField = () => {
        switch (type) {
            case 'select':
                return renderSelect();
            case 'textarea':
                return renderTextarea();
            case 'checkbox':
                return renderCheckbox();
            case 'password':
                return renderPassword();
            case 'dateRange':
                return renderDateRange();
            case 'number':
                return renderInputNumber();
            case 'button':
                return renderButton();
            case 'date':
                return renderDatePicker();
            default:
                return renderInput();
        }
    };

    return <div>{renderField()}</div>;
};
