/**
 * Created by edeity on 2018/3/3.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Col, Icon } from 'antd'
import echarts from 'echarts/lib/echarts'
import CompTypes from '../constants/CompTypes'
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
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
    getLineOption, getBarOption, getPieOption, getRadarOption,
    getScatterOption, getMapOption, getBoxplotOption, getHeatMap, getTreeMap, getSunburstOption,
    getParrallelOption, getFunnelOption, getGaugeOption, getCalendarOption
} from '../options/CompOptions'

const type = ItemTypes.EXCHANGE;
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
        connectDropSource: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        exchangeComp: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isAcive: PropTypes.bool.isRequired,
        isFull: PropTypes.bool,
        col: PropTypes.number.isRequired,
        height: PropTypes.number.isRequried
    }
    componentDidMount() {
        const id = "card-render-" + this.props.index
        this.chart = echarts.init(document.getElementById(id))
        this.compOption = null
        switch (this.props.compType) {
            case CompTypes.Line: {
                this.compOption = getLineOption()
                break
            }
            case CompTypes.Bar: {
                this.compOption = getBarOption()
                break
            }
            case CompTypes.Pie: {
                this.compOption = getPieOption()
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
            case CompTypes.Boxplot: {
                this.compOption = getBoxplotOption()
                break
            }
            case CompTypes.Heatmap: {
                this.compOption = getHeatMap()
                break
            }
            case CompTypes.Treemap: {
                this.compOption = getTreeMap()
                break
            }
            case CompTypes.Sunburst: {
                this.compOption = getSunburstOption()
                break
            }
            case CompTypes.Parallel: {
                this.compOption = getParrallelOption()
                break
            }
            case CompTypes.Funnel: {
                this.compOption = getFunnelOption()
                break
            }
            case CompTypes.Gauge: {
                this.compOption = getGaugeOption()
                break
            }
            case CompTypes.Calendar: {
                this.compOption = getCalendarOption()
                break
            }
            default: {
                break;
            }
        }
        this.chart.setOption(this.compOption)
    }
    componentDidUpdate() {
        if (this.compOption && this.props.isAcive) {
            this.chart.setOption(this.compOption)
            // this.chart.setOption(this.compOption, true)
            this.chart.resize()
        }
    }
    componentWillUnmount() {
        this.chart.dispose();
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
    static propTypes = {
        index: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        compType: PropTypes.string.isRequired,
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

