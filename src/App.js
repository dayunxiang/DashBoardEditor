import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import Pure from './pages/PureData'
import DragPage from './pages/DragPage'
import Pivot from './pages/Pivot'
// import {Row, Col} from 'antd';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="data-app">
                <div className="nav">
                    <h1>Visualized Data</h1>
                    <div className="nav-panel">
                        <NavLink className="item" activeClassName="active" exact to="/">
                            <span>原始数据</span>
                        </NavLink>
                        <NavLink className="item" exact to="/dashboard">
                            <span>仪表盘编辑</span>
                        </NavLink>
                        <NavLink className="item" to="/pivot">
                            <span>透视表</span>
                        </NavLink>
                    </div>
                </div>
                <div className="content">
                    <Route exact path="/" component={Pure}/>
                    <Route exact path="/dashboard" component={DragPage}/>
                    <Route path="/pivot" component={Pivot}/>
                </div>
            </div>
        );
    }
}

export default App;
