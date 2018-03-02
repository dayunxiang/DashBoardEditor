/**
 * Created by edeity on 2018/3/2.
 */
import React, { Component } from 'react';
import {Row, Col} from 'antd';
import DragCard from './DragCard';

export default class DragList extends Component {
    render() {
        return (
            <div className="drag-list">
                <Row>
                    <Col span="8">
                        <DragCard type="rect"/>
                    </Col>
                    <Col span="8">
                        <DragCard type="circle"/>
                    </Col>
                    <Col span="8">
                        <DragCard type="star"/>
                    </Col>
                </Row>

            </div>
        )
    }
}