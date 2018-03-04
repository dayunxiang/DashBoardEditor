/**
 * Created by edeity on 2018/3/2.
 */
import React, {Component} from 'react'
import {Row, Col, Form, Select} from 'antd'
import DragCard from './DragCard'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { changeCol, changeComp } from '../actions/DragAction'

const Option = Select.Option;
const FormItem = Form.Item;

const compList = ["rect", "circle", "star"]

class DragList extends Component {
    static propTypes = {
        focusIndex: PropTypes.number.isRequired,
        compCollection: PropTypes.array.isRequired,
    }

    colSelect = (value) => {
        this.props.changeCol(value)
    }

    compSelect = (value) => {
        this.props.changeComp(value)
    }

    getColSelector = () => {
        let colSelector = [];
        for(let i=1; i<=24; i++) {
            colSelector.push(<Option key={i} value={i}>{i}</Option>)
        }
        return colSelector;
    }

    render() {
        const focusComp = this.props.compCollection[this.props.focusIndex]
        return (
            <div className="drag-list">
                <h2>拖拽组件</h2>
                <Row>
                {
                    compList.map((eachCompType, index) => {
                        return (
                            <Col span="8" key={index} >
                                <DragCard type={eachCompType}/>
                            </Col>
                        )
                    })
                }
                </Row>
                <h2>组件属性</h2>
                {
                    focusComp && (
                        <Form>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem label={"列宽"} style={{display: 'flex'}}>
                                        <Select value={focusComp.col} onSelect={this.colSelect}>
                                            {this.getColSelector()}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label={"类型"} style={{display: 'flex'}}>
                                        <Select value={focusComp.compType} onSelect={this.compSelect}>
                                            {
                                                compList.map((eachCompType, index) => {
                                                    return (
                                                        <Option key={index} value={eachCompType}>{eachCompType}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        focusIndex: state.dragStore.focusIndex,
        compCollection: state.dragStore.compCollection
    }
}

export default connect(mapStateToProps, { changeCol, changeComp })(DragList);