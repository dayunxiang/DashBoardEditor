import React, { Component } from 'react'
import pivotData from '../constants/pivotData'
import BigTable from '../components/bigTable/BigTable'
import './pure.css'

export default class PureData extends Component {
    render() {
        return (
            <div className="pure-containr">
                    <div className="pure-table-container">
                        <BigTable data={pivotData}  hasContentMenu={true}/>
                    </div>
            </div>
        );
    }
}