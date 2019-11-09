const {api} = require('actionhero')

const FormDataChatMiddleware = {
    name: 'FormDataChatMiddleware',
    priority: 1000,
    join: async (connection, room) => {
        const member = {
            id: connection.id,
            connectedAt: connection.connectedAt
        }
        // console.log('join', member)
        const roomStatus = await api.chatRoom.roomStatus(room)
        roomStatus.members[member.id] = member
        const message = {roomStatus}
        await api.chatRoom.broadcast({}, room, message)
    },
    leave: async (connection, room) => {
        const member = {
            id: connection.id,
            connectedAt: connection.connectedAt
        }
        // console.log('leave', member)
        const roomStatus = await api.chatRoom.roomStatus(room)
        delete roomStatus.members[member.id]
        const message = {roomStatus}
        await api.chatRoom.broadcast({}, room, message)
    }
}

module.exports = FormDataChatMiddleware