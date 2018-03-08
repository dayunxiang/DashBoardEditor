/**
 * Created by edeity on 2018/3/2.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import ItemTypes from '../constants/ItemTypes'
import classnames from 'classnames'
import { Row, Col, Button, Tooltip, Modal, Input, message } from 'antd'
import { dropComponent, focusComponent, closeComp, emptyComp, setFull, exchangeComp } from '../actions/CompAction'
import DropCard from './DropCard'


// const ButtonGroup = Button.Group;
const type = ItemTypes.DRAG;
const confirm = Modal.confirm;
const spec = {
    drop(props) {
        props.dropComponent(props.compType)
        // return {
        //     compType: props.compType,
        //     allowedDropEffect
        // }
    }
};
let isFullTips = false; // 仅提示一次
class DropContainer extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        exchangeComp: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        allowedDropEffect: PropTypes.string.isRequired,
        compCollection: PropTypes.array.isRequired,
        focusIndex: PropTypes.number
    }

    getCompCollection() {
        // let focusComp = this.props.compCollection[this.props.focusIndex]
        return this.props.compCollection.map((eachComp, index) => {
            const isAcive = this.props.focusIndex === index
            const isRealFull = isAcive && this.props.isFull
            return <DropCard 
                        compType={eachComp.compType}
                        key={eachComp.id}
                        index={index}
                        isAcive={isAcive}
                        isFull={isRealFull}
                        col={eachComp.col}
                        height={eachComp.height}
                        bgColor={eachComp.bgColor}
                        exchangeComp ={(nextIndex) => {this.props.exchangeComp(this.props.focusIndex, nextIndex)}}
                        onFocus={(index)=> {this.onFocus(index)}}
                        onFull={(isFull, index)=> {this.onFull(isFull, index)}}
                        onClose={(index)=> {this.onCompClose(index)}}/>
        })
    }

    getMeasureCol() {
        let measureCols = []
        for(let i=1; i<=24; i++) {
            let isEm = i % 4 === 0 && i !== 24
            measureCols.push(
                <Col span={1} key={i}>
                    <div className={classnames('measure-block', {'em-block': isEm})}></div>
                </Col>
            )
        }
        return measureCols
    }

    onFocus(index) {
        this.props.focusComponent(index)
    }

    onFull(isFull, index) {
        if(isFull && isFullTips === false) {
            isFullTips = true
            message.info('进入全面板后，会自动隐藏其他组件')
        }
        this.props.setFull(isFull, index)
    }

    onCompClose(index) {
        this.props.closeComp(index)
    }

    // addNewDashPanel = () => {
    //     let panelValue = ''
    //     function changePanelValue(value) {
    //         panelValue = value
    //     }
    //     confirm({
    //         title: '面板名称',
    //         content: <Input placeholder="请输入面板名称" 
    //         onChange={(event) => {changePanelValue(event.target.value)}}/>,
    //         okText: '确定',
    //         cancelText: '取消',
    //         onOk:() => {
    //             console.log(panelValue)
    //         },
    //         onCancel() {},
    //     })
    // }

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
        })
    }
    
    render() {
        const {canDrop, isOver, connectDropTarget, compCollection} = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#fff';
        if (isActive) {
            backgroundColor = '#f9f9f9'
        }

        return connectDropTarget(
            <div className="drop-container" style={{ backgroundColor }}>
                <Row className="container-tool-bar">
                    {/* <Tooltip placement="top" title={"添加面板"}>
                    <Button 
                        className="container-tool-btn" 
                        type="dashed" 
                        shape="circle" 
                        icon="plus" 
                        size="small" 
                        onClick={this.addNewDashPanel}/>
                    </Tooltip> */}
                    <Tooltip placement="top" title={"清空"}>
                        <Button 
                        className="container-tool-btn" 
                        type="dashed" 
                        shape="circle" 
                        icon="delete" 
                        size="small" 
                        onClick={this.ensureEmpty}/>
                    </Tooltip>
                </Row>
                <Row className="measure">
                    {
                        this.getMeasureCol()
                    }
                </Row>
                <Row className={classnames("container-comp-panel", {"is-full": this.props.isFull})}>
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
        isFull: state.dragStore.isFull
    }
}

export default connect(mapStateToProps, { 
    dropComponent, 
    focusComponent, 
    closeComp, 
    emptyComp,
    setFull,
    exchangeComp
})(DropTarget(type, spec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(DropContainer));