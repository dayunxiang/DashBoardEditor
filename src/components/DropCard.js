/**
 * Created by edeity on 2018/3/3.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Col, Icon } from 'antd'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


const baseOption = {
    title: { text: 'ECharts 入门示例' },
    tooltip: {},
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}
export default class DropCard extends Component {
    chart = null
    static propTypes = {
        onFocus: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isAcive: PropTypes.bool.isRequired,
        col: PropTypes.number.isRequired
    }
    componentDidMount() {
        const id = "card-render-" + this.props.index
        this.chart = echarts.init(document.getElementById(id))
    }
    componentWillUpdate() {
        this.chart.setOption(baseOption)
    }
    onFocus = () => {
        this.props.onFocus(this.props.index)
    }
    onBlur = () => {
    }
    onClose = () => {
        this.props.onClose(this.props.index)
    }
    static propTypes = {
        index: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        compType: PropTypes.string.isRequired,
    }
    render() {
        const props = this.props
        return (
            <Col span={props.col}>
                <div tabIndex={props.index}
                     className={classnames("drop-card", {"is-active": this.props.isAcive})}
                     onFocus={ this.onFocus }
                     onBlur={ this.onBlur }>
                    <div className="drop-tool-bar">
                        <div className="close" 
                             onClick={ this.onClose }>
                            <Icon type="close"/>
                        </div>
                    </div>
                    <div id={"card-render-" + this.props.index} className="card-render"></div>
                </div>
        </Col>)
    }
}