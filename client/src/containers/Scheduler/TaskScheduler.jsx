import React, { useRef, useState } from 'react';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { Button, Col, Empty, Row, Segmented, Select, Tag } from 'antd';
import notify from '@/helpers/notify';

import taskService from '@/services/taskService';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { debouncedSearchUserOptions } from '@/utils/searchUser';
import { Modal } from '@/components/Modal';
import Form from '@/forms/Form';
import { createTaskFormFields, updateTaskFormFields } from '@/forms/formData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';

const localizer = momentLocalizer(moment);

const DayWeekEvent = (props) => {
    return (
        <div>
            <div style={{ marginTop: 3 }}>{props.title}</div>
        </div>
    );
};

const getDateValues = (view, date, period) => {
    let startDate, endDate;

    if (period === 'TODAY') {
        startDate = moment(date).startOf('week').toDate();
        endDate = moment(date).endOf('week').toDate();
    } else if (period === 'PREV') {
        startDate = moment(date).subtract(1, 'week').startOf('week').toDate();
        endDate = moment(date).subtract(1, 'week').endOf('week').toDate();
    } else if (period === 'NEXT') {
        startDate = moment(date).add(1, 'week').startOf('week').toDate();
        endDate = moment(date).add(1, 'week').endOf('week').toDate();
    }

    return { startDate, endDate };
};

export const TaskScheduler = () => {
    const [events, setEvents] = useState([]);
    const [isEventModalVisible, setIsEventModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isCreateEventModalVisible, setIsCreateEventModalVisible] =
        useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewValue, setViewValue] = useState('week');

    const calendarRef = useRef();

    const fetchTasks = async (user, startDate, endDate, view) => {
        const startValue = startDate
            ? moment(startDate).startOf('day').toISOString()
            : moment(new Date()).startOf('week').toISOString();
        const endValue = endDate
            ? moment(endDate).endOf('day').toISOString()
            : moment(new Date()).endOf('week').toISOString();

        await taskService
            .getUserTasks(user.userId, startValue, endValue)
            .then((res) => {
                const tasks = res.data;
                let tmpEvents = tasks.map((task) => {
                    return {
                        ...task,
                        title: task.title,
                        start: moment(task.startDate).toDate(),
                        end: moment(task.endDate).toDate(),
                    };
                });
                setEvents(tmpEvents);
                setViewValue(view);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const openTaskEventModal = (eventData) => {
        setIsEventModalVisible(true);
        setSelectedEvent(eventData);
    };

    const openCreateTaskEventModal = (eventData) => {
        setIsCreateEventModalVisible(true);
        setSelectedSlot(eventData);
    };

    const handleSelectUser = (_, user) => {
        setSelectedUser(user);
        fetchTasks(user);
    };

    const handleSearchUsers = async (value) => {
        const users = await debouncedSearchUserOptions(value);
        setUserOptions(users);
    };

    const CustomToolbar = (props) => {
        const { date, view, views, label, onView, onNavigate, localizer } =
            props;

        const onPeriodChange = (newValue) => {
            onNavigate(newValue);
            const { startDate, endDate } = getDateValues(view, date, newValue);
            fetchTasks(selectedUser, startDate, endDate, view);
        };

        return (
            <div className="rbc-toolbar" style={{ display: 'flex' }}>
                <span className="rbc-btn-group">
                    <Button onClick={() => onPeriodChange('PREV')}>
                        <DoubleLeftOutlined />
                    </Button>
                    <Button onClick={() => onPeriodChange('TODAY')}>
                        Today
                    </Button>
                    <Button onClick={() => onPeriodChange('NEXT')}>
                        <DoubleRightOutlined />
                    </Button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <Segmented
                        options={[
                            {
                                label: 'Week',
                                value: 'week',
                            },
                        ]}
                        defaultValue="week"
                        value={viewValue}
                    />
                </span>
            </div>
        );
    };

    const components = {
        week: {
            event: DayWeekEvent,
        },
        toolbar: CustomToolbar,
    };

    const eventStyleGetter = (event) => {
        return {
            style: {
                background: '#bae0ff',
            },
        };
    };

    const handleCreateTask = async (values) => {
        const newValues = {
            ...values,
            startDate: selectedSlot.start,
            endDate: selectedSlot.end,
            user: selectedUser.userId,
        };

        await taskService
            .createTask(newValues)
            .then((res) => {
                const newTask = res.data;

                const newEvent = {
                    ...newTask,
                    start: moment(newTask.startDate).toDate(),
                    end: moment(newTask.endDate).toDate(),
                };

                setEvents((prevEvents) => [...prevEvents, newEvent]);
                setIsCreateEventModalVisible(false);
                setSelectedSlot(null);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const handleUpdateTask = async (updatedValues) => {
        await taskService
            .updateTask(selectedEvent.id, {
                ...updatedValues,
                user: selectedEvent.user,
            })
            .then((res) => {
                const updatedTask = res.data;
                const updatedTasks = events.map((task) =>
                    task.id === updatedTask.id
                        ? {
                              ...updatedTask,
                              start: moment(updatedTask.startDate).toDate(),
                              end: moment(updatedTask.endDate).toDate(),
                              user: task.user,
                          }
                        : task,
                );

                setEvents(updatedTasks);
                setIsEventModalVisible(false);
                setSelectedEvent(null);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const handleDeleteTask = async () => {
        await taskService
            .deleteTask(selectedEvent.id)
            .then(() => {
                setEvents((prevEvents) =>
                    prevEvents.filter((event) => event.id !== selectedEvent.id),
                );
                setIsEventModalVisible(false);
                setSelectedEvent(null);
            })
            .catch((err) => notify(err.response));
    };

    return (
        <div>
            <div>
                <Row>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                        <Select
                            id="user"
                            options={userOptions}
                            onChange={handleSelectUser}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            onSearch={handleSearchUsers}
                            showSearch
                            placeholder="Select user"
                            // allowClear
                            style={{ width: '100%', marginBottom: 10 }}
                        />
                    </Col>
                </Row>
                {selectedUser ? (
                    <>
                        <Calendar
                            ref={calendarRef}
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            views={{ week: true }}
                            defaultView={Views.WEEK}
                            defaultDate={new Date()}
                            selectable
                            onSelectEvent={openTaskEventModal}
                            onSelectSlot={openCreateTaskEventModal}
                            components={components}
                            step={15}
                            min={new Date().setHours(6, 0, 0)}
                            max={new Date().setHours(20, 0, 0)}
                            eventPropGetter={eventStyleGetter}
                            style={{ margin: '10px 0' }}
                        />
                    </>
                ) : (
                    <Empty description="To view scheduled task data, please login and select user." />
                )}
                {isEventModalVisible && (
                    <Modal
                        isVisible={isEventModalVisible}
                        title="Update task event"
                        footer={null}
                        onClose={() => setIsEventModalVisible(false)}
                        maskStyle={{ overflow: 'hidden', fontWeight: 'bold' }}
                    >
                        <Form
                            onSubmit={handleUpdateTask}
                            fields={updateTaskFormFields(
                                selectedEvent,
                                handleDeleteTask,
                            )}
                            layout="vertical"
                            onOkText="Update"
                            onCancelText="Close"
                            onClose={() => setIsEventModalVisible(false)}
                            justifyContent="flex-end"
                        />
                    </Modal>
                )}
                {isCreateEventModalVisible && (
                    <Modal
                        isVisible={isCreateEventModalVisible}
                        title="Create new task event"
                        footer={null}
                        onClose={() => setIsCreateEventModalVisible(false)}
                        maskStyle={{ overflow: 'hidden', fontWeight: 'bold' }}
                    >
                        <Form
                            onSubmit={handleCreateTask}
                            fields={createTaskFormFields()}
                            layout="vertical"
                            onOkText="Create"
                            onCancelText="Close"
                            onClose={() => setIsCreateEventModalVisible(false)}
                            justifyContent="flex-end"
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
};
