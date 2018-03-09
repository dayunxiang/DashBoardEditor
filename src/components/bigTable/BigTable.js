/**
 * Created by edeity on 2017/12/28.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './BigTable.css'

const MOUSE_TYPE = {
    LEFT_DOWN: 0,
    RIGHT_DOWN: 2
}

const defaultConfig = {
    // 相应数据
    data: [],
    rowHeadData: [],
    colHeadData: [],
    row: null,
    col: null,
    // 相应尺寸
    width: 700,
    height: 450,
    cellWidth: 120,
    cellHeight: 25,

    // 相应加载配置
    cacheRow: 20, // 加载的行
    cacheCol: 10, // 加载的列
    loadRow: 8, // 提前加载的行
    loadCol: 3, // 提前加载的列
    // 视图层
    view: {
        isActiveCell: true, // 保留激活状态
        isActiveShadow: true // 阴影效果
    }
};

const colWidth = 100
const rowHeight = 120
const wordNum = 26

class BigTable extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired, // 炫耀渲染的数据
        width: PropTypes.number, // 容器宽
        height: PropTypes.number, // 容器高
        cellWidth: PropTypes.number, // 单元格的行
        cellHeight: PropTypes.number, // 单元格的高
        cacheRow: PropTypes.number, // 每次加载的行
        cacheCol: PropTypes.number, // 每次加载的列
        loadRow: PropTypes.number, // 每次加载的行
        loadCol: PropTypes.number, // 每次加载的列
        hasContentMenu: PropTypes.bool // 是否拥有右键菜单
    }

    constructor(props) {
        super(props);
        this.data = props.data;
        this.allRow = this.data.length;
        this.allCol = this.data[0].length;
        // 处理用户参数和默认配置
        this.cellWidth = props.cellWidth || defaultConfig.cellWidth;
        this.cellHeight = props.cellHeight || defaultConfig.cellHeight;
        let assumeWidth = this.allCol * this.cellWidth + 2; // 宽度以可容纳最小宽度为准, 1 为border宽度
        this.width = props.width || assumeWidth > defaultConfig.width ? defaultConfig.width : assumeWidth;
        this.height = props.height || defaultConfig.height;
        this.cacheRow = props.cacheRow || defaultConfig.cacheRow;
        this.cacheCol = props.cacheCol || defaultConfig.cacheCol;
        this.loadRow = props.loadRow || defaultConfig.loadRow;
        this.loadCol = props.loadCol || defaultConfig.loadCol;
        // 记录拖拽事件
        this.isRecordActive = false
        this.isRecordRowActive = false
        this.isRecordColActive = false

        // 获取首次渲染的数据
        let initPage = this.getRenderPage(this.getViewPage(0, 0));

        // 配置属性
        this.state = {
            innerWidth: this.cellWidth * this.allCol,
            innerHeight: this.cellHeight * this.allRow,
            startRow: 0,
            startCol: 0,
            endRow: initPage.endRow,
            endCol: initPage.endCol,
            // 样式
            scrollLeft: 0,
            scrollTop: 0,
            isTopFixed: 0,
            isLeftFixed: 0,
            // 激活状态
            activeStartRow: -1,
            activeStartCol: -1,
            activeEndRow: -1,
            activeEndCol: -1,
            fRow: -1,
            fCol: -1,
            // 右键菜单
            activeContentMenu: false,
            menuX: -1,
            menuY: -1
        };
    }

    componentDidMount() {
        document.addEventListener('mouseup', ()=>{
            if(this.isRecordActive === true) {
                this.isRecordActive = false
                this.isRecordRowActive = false
                this.isRecordColActive = false
            }
        })
        // if(this.props.hasContentMenu === true) {
        //     this.refs.bodyWrapper.addEventListener('contextmenu', (e)=>{
        //         e.preventDefault();
        //         return false;
        //     })
        // }
    }

    clickFir = () => {
        this.setState({
            scrollLeft: 0,
            scrollTop: 0
        })
    }

    startFirDown = (e) => {
        this.isRecordRowActive = true
        this.isRecordColActive = true
        this.setState({
            activeStartRow: 0,
            activeStartCol: 0,
            activeEndRow: 0,
            activeEndCol: 0,
            fRow: 0,
            fCol: 0
        })
        e.preventDefault()
        return false
    }

    endFirDown = () => {
        this.isRecordRowActive = false
        this.isRecordColActive = false
    }

    startActiveAllRow = (row, e) => {
        this.isRecordRowActive = true
        this.setState({
            activeStartRow: row,
            activeStartCol: 0,
            activeEndRow: row,
            activeEndCol: this.allCol - 1,
            fRow: row,
            fCol: 0
        })
        e.preventDefault()
        return false
    }
    
    enterActiveAllRow = (eRow) => {
        if(this.isRecordRowActive === true) {
            let fRow = this.state.fRow
            let activeStartRow = this.state.activeStartRow
            if(fRow > eRow) {
                let tempRow = eRow
                eRow = fRow
                activeStartRow = tempRow
            }
            this.setState({
                activeStartRow: activeStartRow,
                activeEndRow: eRow,
            })
        }
    }

    stopActiveAllRow = (eRow, e) => {
        this.isRecordRowActive = false
    }

    startActiveAllCol = (col, e) => {
        this.isRecordColActive = true
        this.setState({
            activeStartRow: 0,
            activeStartCol: col,
            activeEndRow: this.allRow - 1,
            activeEndCol: col,
            fRow: 0,
            fCol: col,
        })
        e.preventDefault()
        return false
    }
    
    enterActiveAllCol = (eCol) => {
        if(this.isRecordColActive === true) {
            let fCol = this.state.fCol
            let activeStartCol = this.state.activeStartCol
            if(fCol > eCol) {
                let tempRow = eCol
                eCol = fCol
                activeStartCol = tempRow
            }
            this.setState({
                activeStartCol: activeStartCol,
                activeEndCol: eCol,
            })
        }
    }

    stopActiveAllCol = () => {
        this.isRecordColActive = false
    }

    startActiveRecord = (e) => {
        if(e.button === MOUSE_TYPE.LEFT_DOWN) {
            this.isRecordActive = true
            e.preventDefault()
            return false
        }
    }

    stopActiveRecord = () => {
        this.isRecordActive = false
    }

    activeStartPos = (sRow, sCol) => {
        if(this.isRecordActive === true) {
            this.setState({
                activeStartRow: sRow,
                activeStartCol: sCol,
                activeEndRow: sRow,
                activeEndCol: sCol,
                fRow: sRow,
                fCol: sCol
            })
        }
    }

    activeEnterPos = (eRow, eCol) => {
        if(this.isRecordActive === true) {
            let fRow = this.state.fRow
            let fCol = this.state.fCol
            let sRow = this.state.activeStartRow
            let sCol = this.state.activeStartCol
            if(fRow > eRow) {
                sRow = eRow
                eRow = fRow
            }
            if(fCol > eCol) {
                sCol = eCol
                eCol = fCol
            }
            this.setState({
                activeStartRow: sRow,
                activeStartCol: sCol,
                activeEndRow: eRow,
                activeEndCol: eCol,
            })
        }
    }

    getColGroup = (eCol) => {
        let colGroup = [];
        for (let i = 0; i < eCol; i++) {
            let id = `col_${i}`;
            colGroup.push(<col key={id} id={id} className="hs-col" width={this.cellWidth}></col>);
        }
        return colGroup;
    };
    
    getRowHead = () => {
        let sCol = this.state.startCol;
        let eCol = this.state.endCol;
        let ths = [];
        for (let i = sCol; i < eCol; i++) {
            let id = `th_${i}`;
            let isActive = i >= this.state.activeStartCol && i <= this.state.activeEndCol
            ths.push(
                <th className={classnames("hs-th", { "is-active": isActive })}
                    key={id}
                    id={id}
                    style={{width: this.cellWidth}}
                    onMouseDown={(e)=>this.startActiveAllCol(i, e)}
                    onMouseEnter={(e)=>this.enterActiveAllCol(i)}
                    onMouseUp={(e)=>this.stopActiveAllCol()}>
                    <div><span>{this.getHeadText(i)}</span></div>
                </th>
            )
        }
        return ths;
    };

    // 获取列名称
    getColHead = () => {
        let sRow = 0;
        let eRow = this.allRow;
        let ths = [];
        for (let i = sRow; i < eRow; i++) {
            let id = `tr_${i}`
            let isActive = i >= this.state.activeStartRow && i <= this.state.activeEndRow
            ths.push(<tr key={id} id={id}>
                <th className={classnames("hs-th", { "is-active": isActive })}
                    onMouseDown={(e)=>this.startActiveAllRow(i, e)}
                    onMouseEnter={(e)=>this.enterActiveAllRow(i)}
                    onMouseUp={(e)=>this.stopActiveAllRow()}>
                    <div><span>{i}</span></div>
                </th>
            </tr>)
        }
        return ths;
    }

    // 递归获取显示的名称, 如 A1, A2
    getHeadText = (index) => {
        if (index >= wordNum) {
            return this.getHeadText(parseInt(index / wordNum, 10) - 1) + this.getHeadText(parseInt(index % wordNum, 10));
        } else {
            return String.fromCharCode(65 + index);
        }
    };

    getBody = (sRow, sCol, eRow, eCol) => {
        let trs = [];
        for (let i = sRow; i < eRow; i++) {
            let id = `row_${i}`;
            trs.push(<tr className={classnames("hs-tr")} key={id} id={id}>
                {this.getCell(i, sCol, eCol)}
            </tr>)
        }
        return trs;
    };

    getCell = (currRow, sCol, eCol) => {
        var tds = [];
        for (let j = sCol; j < eCol; j++) {
            let id = `cell_${currRow}_${j}`
            let currData = this.data[currRow][j]
            let isActive = j >= this.state.activeStartCol && j <= this.state.activeEndCol 
                && currRow >= this.state.activeStartRow && currRow <= this.state.activeEndRow
            tds.push(
                <td key={id}
                    id={id}
                    className={classnames("hs-td", { "is-active": isActive })}
                    onMouseDown={(e) => {this.startActiveRecord(e); this.activeStartPos(currRow, j)}}
                    onMouseEnter={() => {this.activeEnterPos(currRow, j)}}
                    onMouseUp={() => {this.stopActiveRecord()}}>
                    {currData.data ? currData.data : currData}
                </td>)
        }
        return tds;
    }

    toggleContentMenu = (e) => {
        if(this.props.hasContentMenu && e.button===MOUSE_TYPE.RIGHT_DOWN) {
            this.setState({
                activeContentMenu: !this.state.activeContentMenu,
                menuX: e.target.offsetLeft,
                menuY: e.target.offsetHeight
            })
            e.preventDefault()
            return false
        }
    }

    // 是否存在于缓存页中
    inPageCache = (currPage) => {
        var compareSRow = currPage.startRow - this.loadRow;
        var compareSCol = currPage.startCol - this.loadCol;
        var compareERow = currPage.endRow + this.loadRow;
        var compareECol = currPage.endCol + this.loadCol;
        var validPage = this.getValidPage({
            startRow: compareSRow,
            startCol: compareSCol,
            endRow: compareERow,
            endCol: compareECol
        });
        return validPage.startRow >= this.state.startRow
            && validPage.startCol >= this.state.startCol
            && validPage.endRow <= this.state.endRow
            && validPage.endCol <= this.state.endCol;
    };

    // 获取合法的页(检查越界的情况)
    getValidPage = (page) => {
        let allRow = this.allRow;
        let allCol = this.allCol;
        return {
            startRow: page.startRow < 0 ? 0 : page.startRow,
            endRow: page.endRow > allRow ? allRow : page.endRow,
            startCol: page.startCol < 0 ? 0 : page.startCol,
            endCol: page.endCol > allCol ? allCol : page.endCol
        }
    };

    // 获得当前需要显示的区域-可能存在越界情况,越界情况在getRenderPage处理
    getViewPage = (top, left) => {
        // 计算当前显示的区域
        let height = this.height;
        let width = this.width;
        let cellWidth = this.cellWidth;
        let cellHeight = this.cellHeight;

        let startRow = parseInt(top / cellHeight, 10);
        let endRow = parseInt((top + height) / cellHeight, 10) + 1;
        let startCol = parseInt(left / cellWidth, 10);
        let endCol = parseInt((left + width) / cellWidth, 10) + 1;

        return {
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol
        };
    };

    getRenderPage = (page) => {
        let startRow = page.startRow - this.cacheRow;
        let startCol = page.startCol - this.cacheCol;
        let endRow = page.endRow + this.cacheRow;
        let endCol = page.endCol + this.cacheCol;
        return this.getValidPage({
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol
        });
    };

    onScroll = (event) => {
        let target = event.nativeEvent.target;
        let top = target.scrollTop;
        let left = target.scrollLeft;

        // 同步滚动的位置
        this.setState({
            scrollLeft: left,
            scrollTop: top
        });

        if (top > 10) {
            this.setState({
                isTopFixed: true
            })
        } else {
            this.setState({
                isTopFixed: false
            })
        }

        if (left > 10) {
            this.setState({
                isLeftFixed: true
            })
        } else {
            this.setState({
                isLeftFixed: false
            })
        }

        var viewPage = this.getViewPage(top, left);
        if (this.inPageCache(viewPage)) {
            // do nothing
        } else {
            var renderPage = this.getRenderPage(viewPage);
            this.setState({
                startRow: renderPage.startRow,
                startCol: renderPage.startCol,
                endRow: renderPage.endRow,
                endCol: renderPage.endCol
            });
        }
    };

    render() {
        let sRow = this.state.startRow
        let sCol = this.state.startCol
        let eRow = this.state.endRow
        let eCol = this.state.endCol
        const startActiveLeft = this.state.activeStartCol * this.cellWidth
        const startActiveTop = this.state.activeStartRow * this.cellHeight
        const activeLength = (this.state.activeEndCol - this.state.activeStartCol + 1) * this.cellWidth  + 1
        const activeHeight = (this.state.activeEndRow - this.state.activeStartRow + 1) * this.cellHeight
        return (
            <div className="big-table">
                <div>
                    {/* 第一个单元格 */}
                    <div className={(this.state.isLeftFixed || this.state.isTopFixed) ? "fir-col fixed" : "fir-col"}
                        style={{ width: colWidth, height: this.cellHeight }}
                        onClick={()=>{this.clickFir()}}
                        onMouseDown={(e)=> {this.startFirDown(e)}}
                        onMouseUp={()=> {this.endFirDown()}}></div>
                    {/* 行表头 */}
                    <div className={'table-wrapper head-wrapper row-wrapper ' + (this.state.isTopFixed ? 'top-fixed' : '')}
                        style={{ width: this.width, height: this.cellHeight }}>
                        <div className="table-inner" 
                            style={{ width: this.state.innerWidth, left: sCol * this.cellWidth }}>
                            <table className="hs-table" 
                                style={{ top: 0, left: - this.state.scrollLeft }}>
                                <thead className="hs-row-head" style={{ width: this.width, height: this.cellHeight }}>
                                    <tr className="hs-row" style={{ width: this.state.innerWidth }}>
                                        {this.getRowHead()}
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    {/* 列表头 */}
                    <div className={"table-wrapper head-wrapper col-wrapper " + (this.state.isLeftFixed ? 'left-fixed' : '')}
                        style={{ width: colWidth, height: this.height }}>
                        <div className="table-inner">
                            <table className="hs-table" style={{ top: -this.state.scrollTop, left: 0 }}>
                                <tbody className="hs-col-head">
                                    {this.getColHead()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* 表数据 */}
                    <div className="table-wrapper body-wrapper"
                        style={{ width: this.width, height: this.height }}
                        onContextMenu={(e)=>{this.toggleContentMenu(e)}}
                        onScroll={this.onScroll}
                        ref="bodyWrapper">
                        <div className="table-inner"
                            style={{ width: this.state.innerWidth, height: this.state.innerHeight }}>
                            <table className="hs-table"
                                style={{ top: sRow * this.cellHeight, left: sCol * this.cellWidth }}>
                                <colgroup>
                                    {this.getColGroup(eCol)}
                                </colgroup>
                                <tbody className="hs-body">
                                    {this.getBody(sRow, sCol, eRow, eCol)}
                                </tbody>
                            </table>
                        </div>
                        {
                            this.state.activeContentMenu && (
                                <div className="content-menu-bar"
                                    style={{top: this.state.menuX, left: this.state.menuY}}>
                                    <div className="content-menu-btn">冻结单元格</div>
                                </div>
                            )
                        }
                        <div className="selected-area" style={{ left: startActiveLeft, top: startActiveTop }}>
                            <div className="selected-border selected-top-area" 
                                style={{ width: activeLength }}></div>
                            <div className="selected-border selected-right-area" 
                                style={{ left: activeLength - 1, height: activeHeight }}></div>
                            <div className="selected-border selected-bottom-area" 
                                style={{ top: activeHeight, width: activeLength }}></div>
                            <div className="selected-border selected-left-area" 
                                style={{ height: activeHeight }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BigTable;