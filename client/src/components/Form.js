import React, { Component } from 'react'
import M from 'materialize-css'

import { connect } from 'react-redux'
import * as actions from '../actions'

import Select from './elements/Select'
import Chips from './elements/Chips'

const TITLE_ID = 'title'
const DESCRIPTION_ID = 'select'

const isNullOrUndefined = obj => obj === null || obj === undefined
const selectOptions = [
    { value: 'none', label: 'Choose your option:', disabled: true },
    { value: 'blog', label: 'Blog' },
    { value: 'news', label: 'News' },
    { value: 'annoucement', label: 'Announcement' },
]

class Form extends Component {
    constructor(props) {
        super(props)
        this.instances = {}
    }

    componentDidMount() {        
        this.textAreaElem = document.getElementById(DESCRIPTION_ID)
        this.connectWS()
    }

    componentDidUpdate() {
        M.textareaAutoResize(this.textAreaElem)
    }

    connectWS() {
        this.client = new window.ActionheroWebsocketClient()

        this.client.on('connected', () => console.log('connected!'))
        this.client.on('disconnected', () => console.log('disconnected :('))

        this.client.on('error', (err) => console.log('Error:', err))
        this.client.on('reconnect', () => console.log('reconnect'))
        this.client.on('reconnecting', () => console.log('reconnecting'))

        this.client.on('say', (msg) => this.props.storeDispatch(msg))

        this.client.connect((err, details) => {
            if (err != null) {
                console.log('Error:', err)
            }else {
                console.log(details)
                this.client.roomAdd('defaultRoom')
                this.props.loadFormWS(this.client)
            }
        })
    }

    render() {        
        return (
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Co-edit Form</a>                        
                    </div>
                </nav>
                <div className="row">
                    <div className="col s12 m6">
                        <label htmlFor={TITLE_ID}>Title</label>
                        <input id={TITLE_ID} type="text" 
                            className="validate" 
                            disabled={isNullOrUndefined(this.props.formData.title)}
                            value={this.props.formData.title || ''} 
                            onChange={e => this.eventUpdateValue(e, "title")}/>
                    </div>
                    <div className="col s12 m6">
                        <label>Select type:</label>
                        <Select 
                            options={selectOptions}
                            data={this.props.formData.type} 
                            onChange={type => this.updateValue('type', type)}/>
                    </div>
                    <div className="col s12">
                        <label htmlFor={DESCRIPTION_ID}>Description</label>
                        <textarea id={DESCRIPTION_ID} 
                            className="materialize-textarea"
                            disabled={isNullOrUndefined(this.props.formData.description)}
                            value={this.props.formData.description || ''}
                            onChange={e => this.eventUpdateValue(e, "description")} />
                    </div>
                    <div className="col s12">
                        <label htmlFor="tags">Tags</label>
                        <Chips 
                            data={this.props.formData.tags} 
                            onChange={tags => this.updateValue('tags', tags)}/>
                    </div>
                </div>
            </div>
        )
    }

    eventUpdateValue(e, key) {        
        e.preventDefault()
        this.updateValue(key, e.target.value)
    }

    updateValue(key, value) {
        const formData = {}
        formData[key] = value
        this.props.updateFormWS(this.client, formData)  
    }
}

const mapStateToProps = (state) => {
    return {
        formData: getFormData(state)
    }
}

const getFormData = (state) => {
    if (!state.form || !state.form.formData) {
        return {
            title: null,
            type: null,
            description: null,
            tags: null
        }
    }
    return { 
        title: state.form.formData.title,
        type: state.form.formData.type,
        description: state.form.formData.description,
        tags: state.form.formData.tags,
    }
}


export default connect(mapStateToProps, actions)(Form)