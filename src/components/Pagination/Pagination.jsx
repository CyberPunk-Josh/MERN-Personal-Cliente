import React from 'react';
import {Pagination as PaginationAntd} from 'antd';

import './Pagination.scss';

export default function Pagination(props) {

    const {post, location, history} = props;
    const currentPage = parseInt(post.page);

    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    }

    return (
        <PaginationAntd
            defaultCurrent={currentPage}
            total={post.totalDocs}
            pageSize={post.limit}
            onChange={newPage => onChangePage(newPage)}
            className='pagination'
        />
    )
}
