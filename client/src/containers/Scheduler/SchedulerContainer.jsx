'use client';
import React from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Typography } from 'antd';
import { TaskScheduler } from '@/containers/Scheduler/TaskScheduler';

const { Title } = Typography;

export const SchedulerContainer = () => {
    return (
        <AppLayout>
            <Title level={2}>Tasks Scheduler</Title>
            <TaskScheduler />
        </AppLayout>
    );
};
