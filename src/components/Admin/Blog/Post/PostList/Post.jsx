import React from 'react';
import {List, Button, Modal, notification} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { getAcessToken } from '../../../../../api/auth';
import {deletePostApi} from '../../../../../api/post';

import './Post.scss';

const {confirm} = Modal;

export default function Post(props) {
    const { post, setReloadPosts } = props;

    const deletePost = post => {
        const token = getAcessToken();

        confirm({
            title: 'Deleting post',
            content: `Are you sure you want to delete ${post.title}?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deletePostApi(token, post._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? 'success' : 'warning';
                        notification[typeNotification]({
                            message: response.message
                        });
                        setReloadPosts(true);
                    })
                    .catch(() => {
                        notification['error']({
                            message: 'Server error'
                        })
                    })
            }
        })
    }

    return (
        <div className="post-list">
            <List 
                dataSource={post.docs}
                renderItem={post => <PostList post={post} deletePost={deletePost} />}  
            />
        </div>
    )
}

function PostList(props) {
    const { post, deletePost } = props;

    return (
        <List.Item
            actions={[
                <Link to={`/blog/${post.url}`} target="_blank">
                    <Button
                        type='primary'
                    >
                        <EyeOutlined />
                    </Button>
                </Link>,
                <Button
                    type='primary'
                >
                    <EditOutlined />
                </Button>,
                <Button
                    type='danger'
                    onClick={() => deletePost(post)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta title={post.title} />
        </List.Item>
    )
}
