/**
 * Created by edeity on 2018/3/3.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Col, Icon } from 'antd'
import echarts from 'echarts/lib/echarts'
import CompTypes from '../constants/CompTypes'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../constants/ItemTypes'
// import compState from '../constants/compState'
// 引入组件
import 'echarts/lib/chart/bar' // 柱形图
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
import {
    getRadarOption, getScatterOption, getMapOption, getBoxplotOption, getHeatMap, 
    getTreeMap, getSunburstOption,
    getParrallelOption, getFunnelOption, getGaugeOption, getCalendarOption
} from '../options/CompOptions'

import getLineOption from '../adapter/lineAdaptor'
import getBarOption from '../adapter/barAdaptor'
import getPieOption from '../adapter/pieAdaptor'

const type = ItemTypes.EXCHANGE;
// const compKeys = Object.keys(compState)
const dragSpec = {
    beginDrag(props) {
        return {
            index: props.index,
        }
    },
}
const dropSpec = {
    drop(props) {
        props.exchangeComp(props.index)
    }
}

class DropCard extends Component {
    chart = null
    static propTypes = {
        compType: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        isAcive: PropTypes.bool.isRequired,
        isFull: PropTypes.bool,
        col: PropTypes.number.isRequired,
        height: PropTypes.number,
        // 显示的数据
        data: PropTypes.array.isRequired,
        rowDim: PropTypes.array.isRequired,
        colDim: PropTypes.array.isRequired,
        renderValue: PropTypes.array.isRequired,
        // 事件
        connectDropSource: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        exchangeComp: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
    }
    componentDidMount() {
        const id = "card-render-" + this.props.index
        this.chart = echarts.init(document.getElementById(id))
        let compOption = this.getOption(this.props.compType)
        this.chart.setOption(compOption)
    }

    /**
     * 仅且仅当compState变更时，才会变更
     */   
    // shouldComponentUpdate(nextProp) {
        // let shoudUpdate = false
        // shoudUpdate =   compKeys.some((eachKey) => {
        //     return this.props[eachKey] !== nextProp[eachKey]
        // });
        // return shoudUpdate 
    // }

    /**
     * 更新DropCard的同时，更新echart
     */
    componentDidUpdate() {
        let option = this.getOption(this.props.compType)
        this.chart.setOption(option, true)
        this.chart.resize()
    }

    componentWillUnmount() {
        this.chart.dispose();
    }

    getOption(compType) {
        let compOption = null
        switch (compType) {
            case CompTypes.Line: {
                return getLineOption(this.props.data, this.props.rowDim, this.props.colDim)
            }
            case CompTypes.Bar: {
                return getBarOption(this.props.data, this.props.rowDim, this.props.colDim)
            }
            case CompTypes.Pie: {
                return getPieOption(this.props.data, this.props.rowDim, this.props.colDim)
            }
            case CompTypes.Radar: {
                return compOption = getRadarOption()
            }
            case CompTypes.Scatter: {
                return compOption = getScatterOption()
            }
            case CompTypes.Map: {
                return compOption = getMapOption()
            }
            case CompTypes.Boxplot: {
                return compOption = getBoxplotOption()
            }
            case CompTypes.Heatmap: {
                return compOption = getHeatMap()
            }
            case CompTypes.Treemap: {
                return compOption = getTreeMap()
            }
            case CompTypes.Sunburst: {
                return compOption = getSunburstOption()
            }
            case CompTypes.Parallel: {
                return compOption = getParrallelOption()
            }
            case CompTypes.Funnel: {
                return compOption = getFunnelOption()
            }
            case CompTypes.Gauge: {
                return compOption = getGaugeOption()
            }
            case CompTypes.Calendar: {
                return compOption = getCalendarOption()
            }
            default: {
                return null
            }
        }
    }

    onFocus = () => {
        this.props.onFocus(this.props.index)
    }
    isFull = (isFull) => {
        this.props.onFull(isFull, this.props.index)
    }
    onClose = () => {
        this.props.onClose(this.props.index)
    }

    render() {
        const props = this.props
        // const { connectDragSource, connectDropTarget } = props;
        return props.connectDropSource(props.connectDragSource(
            <div className="dnd-container">
                <Col span={props.isFull === true ? 24 : props.col}
                    className={classnames("drop-card-container", { "is-active": props.isAcive })}>
                    {props.isOver && <div className="drop-tips">松开即可交换组件的位置</div>}
                    <div tabIndex={props.index}
                        className={classnames("drop-card", { "is-active": props.isAcive }, { "is-card-full": props.isFull })}
                        style={{ height: props.isFull ? "calc(100vh - 120px)" : props.height, backgroundColor: props.bgColor }}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}>
                        <div className="drop-tool-bar">
                            {
                                !this.props.isFull ?
                                    (
                                        <div className="drop-tool-btn"
                                            onClick={() => this.isFull(true)}>
                                            <Icon type="arrows-alt" />
                                        </div>
                                    ) :
                                    (
                                        <div className="drop-tool-btn"
                                            onClick={() => this.isFull(false)}>
                                            <Icon type="shrink" />
                                        </div>
                                    )
                            }

                            <div className="drop-tool-btn"
                                onClick={this.onClose}>
                                <Icon type="close" />
                            </div>
                        </div>
                        <div id={"card-render-" + this.props.index} className="card-render"></div>
                    </div>
                </Col>
            </div>
        ))
    }
}

// export default DropCard

export default DropTarget(type, dropSpec, (connect, monitor) => ({
    connectDropSource: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(DragSource(type, dragSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
}))(DropCard))