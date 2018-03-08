import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { Spin, Alert } from 'antd'

const AppComp = Loadable({
  loader: () => import('./App'),
  loading() {
    return (
      <div className="loading-panel">
        <Spin size="large"></Spin>
        <Alert
          message="请耐心等待..."
          description="工程托管于github pages，不同地区访问速度不一致，可能需要几秒到几十秒的加载时间"
          type="info"
        />
      </div>
    )
  }
});

export default class LoadableApp extends Component {
  render() {
    return <AppComp />;
  }
}