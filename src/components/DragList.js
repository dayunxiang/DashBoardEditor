/**
 * Created by edeity on 2018/3/2.
 */
import React, {Component} from 'react'
import {Row, Col, Form, Select, InputNumber, Tabs} from 'antd'
import DragCard from './DragCard'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeCol, changeComp, changeHeight, changeBgColor} from '../actions/CompAction'
import CompTypes from '../constants/CompTypes'
import {CompactPicker} from 'react-color'

const Option = Select.Option
const FormItem = Form.Item
const TabPane = Tabs.TabPane

const compList = Object.values(CompTypes)

class DragList extends Component {

    state = {
        isShowBgColorPicker: false
    }

    static propTypes = {
        focusIndex: PropTypes.number.isRequired,
        compCollection: PropTypes.array.isRequired,
    }

    __handleBgColorClick = () => {
        this.setState({
            isShowBgColorPicker: !this.state.isShowBgColorPicker
        })
    }

    onHeightChange = (value) => {
        this.props.changeHeight(value)
    }

    onBgChange = (color) => {
        this.props.changeBgColor(color.hex)
    }

    colSelect = (value) => {
        this.props.changeCol(value)
    }

    compSelect = (value) => {
        this.props.changeComp(value)
    }

    getColSelector = () => {
        let colSelector = [];
        for (let i = 1; i <= 24; i++) {
            colSelector.push(<Option key={i} value={i}>{i}</Option>)
        }
        return colSelector;
    }

    render() {
        const focusComp = this.props.compCollection[this.props.focusIndex]
        return (
            <div className="drag-list">
                <h3>所展示组件均为ecahrt官方示例</h3>
                <Tabs defaultActiveKey="drag-comp" size="small">
                    <TabPane tab="拖拽组件" key="drag-comp">

                        <Row>
                            {
                                compList.map((eachCompType, index) => {
                                    return (
                                        <Col span="8" key={index}>
                                            <DragCard type={eachCompType}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </TabPane>
                    {
                        focusComp &&
                        (
                            <TabPane tab="基本属性" key="base-config">
                                <Form>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <FormItem label={"列宽"} style={{display: 'flex'}}>
                                                <Select value={focusComp.col}
                                                        size="small"
                                                        onSelect={this.colSelect}>
                                                    {this.getColSelector()}
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem label={"类型"} style={{display: 'flex'}}>
                                                <Select value={focusComp.compType}
                                                        size="small"
                                                        onSelect={this.compSelect}>
                                                    {
                                                        compList.map((eachCompType, index) => {
                                                            return (
                                                                <Option key={index}
                                                                        value={eachCompType}>{eachCompType}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span={24}>
                                            <FormItem label={"高度"}
                                                      style={{display: 'flex'}}
                                                      labelCol={{span: 3}}>
                                                <InputNumber value={focusComp.height}
                                                             size="small"
                                                             onChange={this.onHeightChange}/>
                                            </FormItem>
                                        </Col>
                                        <Col span={24}>
                                            <label>背景颜色：</label>
                                            <div className="color-container">
                                                <div className="color-block"
                                                     style={{backgroundColor: focusComp.bgColor}}
                                                     onClick={ this.__handleBgColorClick }>
                                                </div>
                                            </div>
                                            {
                                                this.state.isShowBgColorPicker &&
                                                <CompactPicker style={{paddingTop: 10}} color={focusComp.bgColor}
                                                               onChange={this.onBgChange}/>
                                            }
                                        </Col>
                                    </Row>
                                </Form>
                            </TabPane>
                        )
                    }
                    <TabPane tab="生成配置" key="str-config">
                        <p>{JSON.stringify(this.props.compCollection)}</p>
                    </TabPane>
                </Tabs>
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

export default connect(mapStateToProps, {changeCol, changeComp, changeHeight, changeBgColor})(DragList);