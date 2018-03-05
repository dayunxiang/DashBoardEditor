/**
 * Created by edeity on 2018/3/3.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Col, Icon } from 'antd'
import echarts from 'echarts/lib/echarts'
// 引入组件
import  'echarts/lib/chart/bar' // 柱形图
import 'echarts/lib/chart/pie' // 饼图
import 'echarts/lib/chart/radar' // 雷达图
import 'echarts/lib/chart/scatter' // 点图
// 地图
import 'echarts/map/js/china'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/visualMap'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import CompTypes from '../constants/CompTypes'
import { getLineOption, getCircleOption, getRadarOption, getScatterOption, getMapOption } from '../options/CompOptions'

export default class DropCard extends Component {
    chart = null
    static propTypes = {
        onFocus: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isAcive: PropTypes.bool.isRequired,
        col: PropTypes.number.isRequired,
        height: PropTypes.number.isRequried
    }
    componentDidMount() {
        const id = "card-render-" + this.props.index
        this.chart = echarts.init(document.getElementById(id))
        this.compOption = null
        switch(this.props.compType) {
            case CompTypes.Line: {
                this.compOption = getLineOption()
                break
            }
            case CompTypes.Circle: {
                this.compOption = getCircleOption()
                break
            }
            case CompTypes.Radar: {
                this.compOption = getRadarOption()
                break
            }
            case CompTypes.Scatter: {
                this.compOption = getScatterOption()
                break
            }
            case CompTypes.Map: {
                this.compOption = getMapOption()
                break
            }
            default: {
                break;
            }
        }
        this.chart.setOption(this.compOption)
    }
    componentDidUpdate() {
        this.chart.setOption(this.compOption, true)
        this.chart.resize()
    }
    componentWillUnmount() {
        this.chart.dispose();
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
                     style={{height: props.height, backgroundColor: props.bgColor}}
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