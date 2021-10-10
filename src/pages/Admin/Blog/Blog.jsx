import React, {useEffect, useState} from 'react';
import {Button, notification} from 'antd';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Modal from '../../../components/Modal';
import {getPostApi} from '../../../api/post';
import PostList from '../../../components/Admin/Blog/Post/PostList/Post';
import Pagination from '../../../components/Pagination/Pagination';
import AddEditPostForm from '../../../components/Admin/Blog/Post/AddEditPostForm/AddEditPostForm';

import './Blog.scss';

function Blog(props) {

    const {location, history} = props;
    const [post, setPost] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPostApi(12, page)
            .then(response => {
                if(response?.code !== 200){
                    notification['warning']({
                        message: response.message
                    })
                } else {
                    // console.log(response)
                    setPost(response.message)
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'Server error'
                });
            });
            setReloadPosts(false);
    }, [page, reloadPosts]);

    const addPosts = () => {
        setIsVisibleModal(true);
        setModalTitle('Add new posts');
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={null}
            />
        )
    }

    if(!post) {
        return null;
    }

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={addPosts}>New Post</Button>
            </div>
            <PostList post={post} setReloadPosts={setReloadPosts}/>
            <Pagination
                post={post}
                location={location}
                history={history}
            />

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width='75%'
            >
                {modalContent}
            </Modal>
        </div>
    )
};

export default withRouter(Blog);
