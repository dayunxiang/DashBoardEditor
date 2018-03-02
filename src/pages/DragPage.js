import React, {Component} from 'react';
// import {fetchContacts, deleteContact} from '../actions/drag-action';
import {Row, Col} from 'antd';
import DragList from '../components/DragList';
import DragContainer from '../components/DropContainer';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ContactListPage extends Component {
    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div className="drag-panel">
                    <Row gutter={16}>
                        <Col span={18}>
                            <DragContainer allowedDropEffect="copy"/>
                        </Col>
                        <Col span={6}>
                            <DragList/>
                        </Col>
                    </Row>
                </div>
            </DragDropContextProvider>
        )
    }
}

export default ContactListPage;