'use client';
import { AppLayout } from '@/layouts/AppLayout';
import { PostsList } from '@/containers/Home/PostsList';
import React, { useEffect, useState } from 'react';
import postService from '@/services/postService';
import { Button, Tooltip, Typography } from 'antd';
import { Modal } from '@/components/Modal';
import Form from '@/forms/Form';
import { createPostFormFields } from '@/forms/formData';
import { useSelector } from 'react-redux';
import notify from '@/helpers/notify';

const { Title } = Typography;

export const HomeContainer = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5,
        totalPages: 1,
        total: 0,
    });
    const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
        useState(false);

    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    useEffect(() => {
        fetchPosts(pagination.page, pagination.pageSize);
    }, []);

    const fetchPosts = async (currentPage, currentPageSize) => {
        await postService
            .getPosts(currentPage, currentPageSize)
            .then((response) => {
                const { data, total, page, pageSize, totalPages } =
                    response.data;
                setPosts(data);
                setPagination({
                    ...pagination,
                    page,
                    pageSize,
                    totalPages,
                    total,
                });
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const pageChangeHandler = async (page) => {
        await fetchPosts(page, pagination.pageSize);
    };

    const handleCreatePost = async (values) => {
        await postService
            .createPost(values)
            .then((res) => {
                const newPost = res.data;
                setPosts((prevPosts) => [newPost, ...prevPosts]);
                setIsCreatePostModalVisible(false);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    return (
        <AppLayout>
            <Title level={2}>Blog posts</Title>
            {!isUserLoggedIn ? (
                <Tooltip title="Please login to create a post.">
                    <Button disabled>Create post</Button>
                </Tooltip>
            ) : (
                <Button onClick={() => setIsCreatePostModalVisible(true)}>
                    Create post
                </Button>
            )}
            <PostsList
                data={posts}
                pagination={pagination}
                onPageChange={pageChangeHandler}
            />

            {isCreatePostModalVisible && (
                <Modal
                    isVisible={isCreatePostModalVisible}
                    title="Login"
                    onClose={() => setIsCreatePostModalVisible(false)}
                >
                    <Form
                        onSubmit={handleCreatePost}
                        fields={createPostFormFields()}
                        layout="vertical"
                        onOkText="Create"
                        onCancelText="Close"
                        onClose={() => setIsCreatePostModalVisible(false)}
                        justifyContent="flex-end"
                    />
                </Modal>
            )}
        </AppLayout>
    );
};
