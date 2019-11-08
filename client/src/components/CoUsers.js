import React, { Component } from 'react'
import userImg from '../image/user-icon.png'

export default class CoUsers extends Component {
    render() {
        return (
            <div className="row" style={{marginTop:'10px'}}>
                {this.getUserList().map(this.renderUser.bind(this))}
            </div>
        )
    }

    getUserList() {
        const list = []
        if (this.props.data && this.props.data.members) {
            for(let key in this.props.data.members) {
                list.push(this.props.data.members[key])
            }
        }
        return list
    }

    renderUser(member, index) {
        return (
            <div key={index} className="chip right" >
                <img src={userImg} alt="Contact Person" />
                {member.id.slice(0, 4)}
            </div>
        )
    }
}