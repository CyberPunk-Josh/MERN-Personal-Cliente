import React, { useEffect, useState } from 'react';
import { getMenuAPI } from '../../../api/menu';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList/MenuWebList';

export default function MenuWeb(){

    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenuAPI().then(response => {
            setMenu(response.menus);
        })
        setReloadMenuWeb(false);
    }, [reloadMenuWeb])

    return (
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    )
}