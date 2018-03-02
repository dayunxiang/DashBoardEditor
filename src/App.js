import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';
import DragPage from './pages/DragPage';
import {Row, Col} from 'antd';
import './App.css';
// import ContactFormPage from './pages/contact-form-page';

class App extends Component {
    render() {
        return (
            <div className="drag-app">
                <Row>
                    <Col span={24}>
                        <div className="nav">
                            <NavLink className="item" activeClassName="active" exact to="/">
                                <h1>仪表盘编辑器</h1>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Route exact path="/" component={DragPage}/>
            </div>
        );
    }
}

export default App;
