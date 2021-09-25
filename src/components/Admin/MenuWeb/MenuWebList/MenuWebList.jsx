import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable-plus';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { updateMnuAPI, activateMenuAPI, deleteMenuAPI } from '../../../../api/menu';
import { getAcessToken } from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

import './MenuWebList.scss';

const {confirm} = ModalAntd;

export default function MenuWebList(props) {
    const {menu, setReloadMenuWeb} = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        menu.forEach(item => {
            listItemsArray.push({
                content: (<MenuItem
                            item={item}
                            activateMenu={activateMenu} 
                            editMenuWebModal={editMenuWebModal} 
                            deletemeMenu={deletemeMenu} 
                />)
            })
        });
        setListItems(listItemsArray);
    }, [menu]);

    const activateMenu = (menu, status) => {
        const token = getAcessToken();
        activateMenuAPI(token, menu._id, status).then((response) => {
            notification['success']({
                message: response
            })
        })
    }

    const onSort = (sortedList, dropEvent) => {
        const token = getAcessToken();

        sortedList.forEach(item => {
            const {_id} = item.content.props.item;
            const order = item.rank;
            updateMnuAPI(token, _id, {order});
        })
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creating New Menu');
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editing menu: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        );
    };

    const deletemeMenu = menu => {
        const token = getAcessToken();

        confirm({
            title: 'Delete menu',
            content: `Are you sure you want to delete ${menu.title}?`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk(){
                deleteMenuAPI(token, menu._id)
                    .then(response => {
                        notification['success']({
                            message: response
                        });
                        setReloadMenuWeb(true);
                    })
                    .catch(() => {
                        notification['error']({
                            message: 'Server error'
                        })
                    })
            }
        })
    };

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type='primary' onClick={addMenuWebModal}>Create menu</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type='vertical'/>
            </div>

            {/* MODAL */}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function MenuItem(props) {
    const {item, activateMenu, editMenuWebModal, deletemeMenu} = props;

    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                <Button type='primary' onClick={() => editMenuWebModal(item)}>
                    <EditOutlined />
                </Button>,
                <Button type='danger' onClick={() => deletemeMenu(item)}>
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title}  description={item.url}/>

        </List.Item>
    )
}
