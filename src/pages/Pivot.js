import React, { Component } from 'react'
import { Tabs } from 'antd'
import pivotData from '../constants/pivotData'
import BigTable from '../components/bigTable/BigTable'
import './pivot.css'

const TabPane = Tabs.TabPane

export default class Pivot extends Component {
    render() {
        return (
            <div className="pivot-containr">
                <Tabs defaultActiveKey="pure-data">
                    <TabPane tab="原始数据" key="pure-data">
                    <div className="pure-table-container">
                        <BigTable data={pivotData}  hasContentMenu={true}/>
                    </div>
                    </TabPane>
                    <TabPane tab="透视表" key="pivot-data">
                        <div>透视表</div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}