/**
 * Created by edeity on 2018/3/2.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ItemTypes from '../targets/ItemTypes'


const type = ItemTypes.DRAG;
const spec = {
    drop(props) {
        const allowedDropEffect = props.allowedDropEffect
        return {
            compType: props.compType,
            allowedDropEffect
        }
    }
};

class DropContainer extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        allowedDropEffect: PropTypes.string.isRequired,
    }
    render() {
        const {canDrop, isOver, connectDropTarget, compType} = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#fff';
        if (isActive) {
            backgroundColor = '#e1e1e1'
        } else if (canDrop) {
            backgroundColor = '#d1d1d1'
        }

        return connectDropTarget(
            <div className="drag-container" style={{ backgroundColor }}>
                {isActive ? 'Release to drop' : 'Drag a box here'}
                { compType && <div className="drag-card">{ compType }</div> }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        compType: state.dragStore.compType,
    }
}

export default connect(mapStateToProps)(DropTarget(type, spec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(DropContainer));