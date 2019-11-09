import React, { Component } from 'react'

export default class Select extends Component {
    render() {
        const value = this.props.data || (this.props.options && this.props.options[0].value) || ''
        return (
            <select className="browser-default"
                value={value} 
                onChange={this.handleSelect.bind(this)}>
                {this.props.options && this.props.options.map(this.renderOption.bind(this))}
            </select>
        )
    }

    renderOption(item, index) {
        return (
            <option key={index} 
                value={item.value} 
                disabled={item.disabled===true}>
                {item.label || item.value}
            </option>
        )
    }

    handleSelect(event) {
        this.props.onChange && this.props.onChange(event.target.value)
    }
}