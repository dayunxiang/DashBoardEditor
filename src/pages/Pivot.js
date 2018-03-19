import React, { Component } from 'react'
// import { Tabs } from 'antd'
// import pivotData from '../constants/pivotData'
// import BigTable from '../components/bigTable/BigTable'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import './pivot.css'

import data from '../constants/pivotData'


// const TabPane = Tabs.TabPane

export default class Pivot extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return (
            <div className="pivot-containr" >
                <PivotTableUI data={data}  onChange={s => this.setState(s)} {...this.state}/>
            </div>
        );
    }
}