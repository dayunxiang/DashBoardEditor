/**
 * Created by edeity on 2018/3/2.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import ItemTypes from '../targets/ItemTypes';
import { dragComponent } from '../actions/DragAction';

const type = ItemTypes.DRAG;
const spec = {
    beginDrag(props) {
        props.dragComponent(props.type);
        return {
            compType: props.type,
        }
    },
    endDrag(props, monitor) {
        // const item = monitor.getItem()
        // const dropResult = monitor.getDropResult()
        // if(dropResult && dropResult.compType) {
        //     props.dropComponent(dropResult.compType)
        // }
    }
}

class DragCard extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        compType: PropTypes.string.isRequired
    }

    render() {
        const { isDragging, connectDragSource } = this.props
        const { type } = this.props
        const opacity = isDragging ? 0.4 : 1

        return connectDragSource(
            <div className="drag-card" style={{ opacity }}>
                {type}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        compType: state.dragStore.compType
    }
}

export default connect(mapStateToProps, { dragComponent })(DragSource(type, spec,  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(DragCard));