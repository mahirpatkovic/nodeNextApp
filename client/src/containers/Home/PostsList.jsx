import React, { useState } from 'react';
import { Avatar, Flex, List, Space } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import CommentsList from '@/containers/Home/CommentsList';
import moment from 'moment/moment';

export const PostsList = ({ data, pagination, onPageChange }) => {
    const [visibleCommentPostId, setVisibleCommentPostId] = useState('');

    const IconText = ({ icon, text, postId }) => (
        <Space>
            <Flex
                gap={5}
                style={{ cursor: 'pointer' }}
                onClick={() => setVisibleCommentPostId(postId)}
            >
                {React.createElement(icon)}
                {text}
            </Flex>
        </Space>
    );

    const pageChangeHandler = (page) => {
        onPageChange(page);
        setVisibleCommentPostId('');
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                current: pagination.page,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: false,
                onChange: (page) => pageChangeHandler(page),
            }}
            dataSource={data}
            footer={null}
            renderItem={(item, i) => (
                <>
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText
                                icon={MessageOutlined}
                                text="Comments"
                                key="list-vertical-message"
                                postId={item.id}
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                                />
                            }
                            title={item.title}
                            description={`${item?.user.username} - ${moment(
                                item?.createdAt,
                            ).fromNow()}`}
                        />
                        {item.content}
                    </List.Item>
                    {visibleCommentPostId === item.id && (
                        <CommentsList
                            postId={item.id}
                            data={item.comments}
                            onCollapse={() => setVisibleCommentPostId('')}
                        />
                    )}
                </>
            )}
        />
    );
};
