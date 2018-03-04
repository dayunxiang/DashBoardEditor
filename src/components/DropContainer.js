/**
 * Created by edeity on 2018/3/2.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ItemTypes from '../targets/ItemTypes'
import { Row, Col, Button, Tooltip, Modal } from 'antd'
import { dropComponent, focusComponent, closeComp, emptyComp } from '../actions/DragAction';
import DropCard from './DropCard';


const ButtonGroup = Button.Group;
const type = ItemTypes.DRAG;
const confirm = Modal.confirm;
const spec = {
    drop(props) {
        const allowedDropEffect = props.allowedDropEffect
        props.dropComponent(props.compType);
        // return {
        //     compType: props.compType,
        //     allowedDropEffect
        // }
    }
};

class DropContainer extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        allowedDropEffect: PropTypes.string.isRequired,
        compCollection: PropTypes.array.isRequired,
        focusIndex: PropTypes.number
    }

    getCompCollection() {
        return this.props.compCollection.map((eachComp, index) => {
            return <DropCard compType={eachComp.compType}
                             key={index}
                             index={index}
                             isAcive={this.props.focusIndex===index}
                             col={eachComp.col}
                             onFocus={(index)=> {this.onFocus(index)}}
                             onClose={(index)=> {this.onCompClose(index)}}
            />
        })
    }

    onFocus(index) {
        this.props.focusComponent(index)
    }

    onCompClose(index) {
        this.props.closeComp(index)
    }

    ensureEmpty = () => {
        confirm({
            title: '清空内容',
            content: '确定清空面板的所有内容?',
            okText: '确定',
            cancelText: '取消',
            onOk:() => {
                this.props.emptyComp()
            },
            onCancel() {},
        });
    }
    
    render() {
        const {canDrop, isOver, connectDropTarget, compType, compCollection} = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#fff';
        if (isActive) {
            backgroundColor = '#e1e1e1'
        }

        return connectDropTarget(
            <div className="drop-container" style={{ backgroundColor }}>
                <Row className="container-tool-bar">
                    <ButtonGroup>
                        <Tooltip placement="top" title={"清空"}>
                            <Button type="dashed" shape="circle" icon="delete" size={'small'} onClick={this.ensureEmpty}/>
                        </Tooltip>
                    </ButtonGroup>
                </Row>
                <Row>
                    {
                        compCollection && compCollection.length > 0 ?
                        this.getCompCollection() :
                        <div className="container-tips">
                            {
                                isActive ?
                                <span>松开以添加组件</span> :
                                <span>将组件拉至此处</span>

                            }
                        </div>
                    }
                    {
                        isActive &&
                        <Col span={12}>
                            <div className="place-comp"></div>
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        compType: state.dragStore.compType,
        compCollection: state.dragStore.compCollection,
        focusIndex: state.dragStore.focusIndex,
    }
}

export default connect(mapStateToProps, { 
    dropComponent, 
    focusComponent, 
    closeComp, 
    emptyComp
})(DropTarget(type, spec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(DropContainer));