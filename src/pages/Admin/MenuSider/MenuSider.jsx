import React from 'react';
import {Link, withRouter } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined, UserOutlined, ReadOutlined, BookOutlined } from '@ant-design/icons';


// SCSS:
import './MenuSider.scss';

function MenuSider(props){

    const {menuCollapsed, location} = props;
    const {Sider} = Layout;

    return(
        <Sider className="menu-sider" collapsed={menuCollapsed}> 
            <Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key='/admin'>
                    <Link to={'/admin'}>
                        <HomeOutlined />
                        <span className='nav-text'>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='/admin/users'>
                    <Link to={'/admin/users'}>
                        <UserOutlined />
                        <span className='nav-text'>Users</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='/admin/menu'>
                    <Link to={'/admin/menu'}>
                        <ReadOutlined />
                        <span className='nav-text'>Menu</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='/admin/blog'>
                    <Link to={'/admin/blog'}>
                        <BookOutlined />
                        <span className='nav-text'>Blog</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);