import React, { useEffect, useRef, useState } from 'react';
import { Button, List } from 'antd';
import commentService from '@/services/commentService';
import { createCommentFormFields } from '@/forms/formData';
import Form from '@/forms/Form';
import { useSelector } from 'react-redux';
import moment from 'moment';
import notify from '@/helpers/notify';

const CommentsList = ({ postId, data, onCollapse }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState(data || []);
    const [page, setPage] = useState(1);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);
    const [newCommentsCount, setNewCommentsCount] = useState(0);

    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const resetFormRef = useRef(null);

    useEffect(() => {
        fetchPostComments(page);
    }, []);

    const fetchPostComments = async (currentPage) => {
        await commentService
            .getPostComments(postId, currentPage)
            .then((res) => {
                const { data, total, page, pageSize, totalPages } = res.data;
                const newData = [...comments, ...data];
                setIsLoadMoreVisible(page !== totalPages);
                setComments(newData);
                setPage(page);
                setInitLoading(false);
                setLoading(false);
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const createComment = async (values) => {
        await commentService
            .createComment({ ...values, post: postId })
            .then((res) => {
                const newComment = res.data;
                setComments((prevComments) => [newComment, ...prevComments]);
                setNewCommentsCount((prevCount) => prevCount + 1);
                setIsLoadMoreVisible(false);
                if (resetFormRef.current) {
                    resetFormRef.current(); // Reset the form after successful comment creation
                }
            })
            .catch((err) => {
                notify(err.response);
            });
    };

    const onLoadMore = async () => {
        setLoading(true);
        const newPage = page + 1;
        await fetchPostComments(newPage);
    };

    const loadMore =
        !initLoading &&
        !loading &&
        isLoadMoreVisible &&
        comments.length > 0 &&
        newCommentsCount === 0 ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>Load more</Button>
            </div>
        ) : null;

    return (
        <div style={{ marginLeft: 50 }}>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={comments}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item?.user?.username}
                            description={
                                <>
                                    <div>
                                        {moment(item?.createdAt).fromNow()}
                                    </div>
                                    <div>{item?.content}</div>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
            <Form
                onSubmit={createComment}
                fields={createCommentFormFields()}
                layout="vertical"
                onOkText="Create"
                onCancelText="Collapse"
                onClose={onCollapse}
                justifyContent="flex-start"
                disabledOkButton={!isUserLoggedIn}
                disabledButtonTooltip="Please login to add a comment."
                resetFormRef={(resetForm) => (resetFormRef.current = resetForm)}
            />
        </div>
    );
};

export default CommentsList;
