import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Spin, Alert } from 'antd'

const AppComp = Loadable({
  loader: () => import('./App'),
  loading() {
    return (<div className="loading-panel">
            <Spin>
                <Alert
                    message="工程托管于github pages, 导致访问过慢"
                    description="可能需要几秒到几十秒的加载时间，请耐心等待"
                    type="info"
                />
            </Spin>
        </div>)
  }
});

export default class LoadableApp extends Component {
  render() {
    return <AppComp/>;
  }
}