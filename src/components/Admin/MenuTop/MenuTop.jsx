import React from 'react';
import {Button} from 'antd';
import {MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined} from '@ant-design/icons';
import Logo from '../../../assets/img/png/logo-white.png'
import './MenuTop.scss';
import { logout } from '../../../api/auth';

 export default function MenuTop(props){
     const {setMenuCollapsed, menuCollapsed} = props;

     const logOutUser = () => {
         logout();
         window.location.reload();
     }

    return(
        <div className="menu-top">
            <div className="menu-top__left">
                <img
                    className="menu-top__left-logo"
                    src={Logo} 
                    alt="joshue neyra"
                />
                <Button type='link' onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ?  <MenuFoldOutlined /> : <MenuUnfoldOutlined /> }
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type='link' onClick={logOutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
 }