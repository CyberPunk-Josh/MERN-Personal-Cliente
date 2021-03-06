import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/png/logo-white.png';
import {getMenuAPI} from '../../../api/menu';
import SocialLinks from '../SocialLinks/SocialLinks';

import './MenuTop.scss';

import {Menu} from 'antd';

export default function MenuTop(){

    const [menuData, setMenuData] = useState([]);

    console.log(menuData);

    useEffect(() => {
        getMenuAPI().then(response => {
            const arrayMenu = [];
            response.menus.forEach(item => {
                if(item.active){
                    arrayMenu.push(item);
                }
            });
            setMenuData(arrayMenu);
        })
    }, []);

    return (
        <Menu className="menu-top-web" mode='horizontal'>
            <Menu.Item className="menu-top-web__logo">
                <Link to={'/'}>
                    <img src={logo} alt='joshue neyra'/>
                </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf('http') > -1 ? true : false;

                if (external) {
                    return (
                        <Menu.Item key={item._id} className='menu-top-web__item'>
                            <a href={item.url} target="_blank" rel="noopener noreferrer"> {item.title} </a>
                        </Menu.Item>
                    )
                }
                return (
                    <Menu.Item key={item._id} className='menu-top-web__item'>
                        <Link to={item.url} target="_blank" rel="noopener noreferrer"> {item.title} </Link>
                    </Menu.Item>
                )
            })}
            <SocialLinks />
        </Menu>
    )
}