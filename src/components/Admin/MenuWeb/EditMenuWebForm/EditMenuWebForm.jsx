import React, {useState, useEffect} from 'react';
import { Form, Input, Button, notification} from 'antd';
import { updateMnuAPI } from '../../../../api/menu';
import { getAcessToken } from '../../../../api/auth';
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons';


import './EditMenuWebForm.scss';

export default function  EditMenuWebForm(props) {
     const {setIsVisibleModal, setReloadMenuWeb, menu} = props;
     const [menuWebData, setMenuWebData] = useState(menu);

     useEffect(() => {
        setMenuWebData(menu);
     }, [menu]);

     const editMenu = () => {
         if(!menuWebData.title || !menuWebData.url){
             notification['error']({
                 menuWebData: 'All fields are required'
             })
         } else {
             const token = getAcessToken();
             updateMnuAPI(token, menuWebData._id, menuWebData)
                .then(response => {
                    notification['success']({
                        menuWebData: response
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                })
                .catch( () => {
                    notification['error']({
                        message: 'Server error, try it later'
                    })
                })
         }
     }

     return (
         <div className="edit-menu-web-form">
             <EditForm
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
             />
         </div>
     )
}

function EditForm(props) {

    const {menuWebData, setMenuWebData, editMenu} = props;

    return (
        <Form className="form-edit" onFinish={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined/>}
                    placeholder='Title'
                    value={menuWebData.title}
                    onChange={ e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined />}
                    placeholder='URL'
                    value={menuWebData.url}
                    onChange={ e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Update Menu
                </Button>
            </Form.Item>
        </Form>
    )
}
