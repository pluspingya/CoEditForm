import React, { Component } from 'react'

export default class Chips extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    render() {
        return (
            <div className="chips" onClick={this.handleDivClick.bind(this)}>
                {this.props.data && this.props.data.map(this.renderChip.bind(this))}
                <input className="input" ref={this.inputRef} onKeyPress={this.handleInput.bind(this)}></input>
            </div>
        )
    }

    renderChip(item, index) {
        return (
            <div className="chip" key={index}>
                {item}
                <i className="inline-icon material-icons" onClick={e => this.handleRemove(e, index)}>close</i>
            </div>
        )
    }

    handleDivClick(event) {
        event.preventDefault()
        this.inputRef.current.focus()
    }

    handleInput(event) {
        if (event.key !== 'Enter' && event.key !== ',') {
            return
        }
        let items = []
        if (this.props.data && this.props.data.length) {
            items = items.concat(this.props.data)
        }
        if (items.indexOf(event.target.value) === -1) {
            items.push(event.target.value)
        }
        this.props.onChange && this.props.onChange(items)
        event.target.value = ''
    }

    handleRemove(e, removeIndex) {
        e.preventDefault()
        let items = []
        if (this.props.data && this.props.data.length) {
            items = items.concat(this.props.data)
        }
        items.splice(removeIndex, 1)
        this.props.onChange && this.props.onChange(items)
    }
}