const {Initializer, api} = require('actionhero')

const chatMiddleware = {
    name: 'chatmiddleware',
    priority: 1000,
    join: async (connection, room) => {
        const member = {
            id: connection.id,
            connectedAt: connection.connectedAt
        }
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
        const roomStatus = await api.chatRoom.roomStatus(room)
        delete roomStatus.members[member.id]
        const message = {roomStatus}
        await api.chatRoom.broadcast({}, room, message)
    }
}

module.exports = class FormData extends Initializer {
    constructor () {
        super()
        this.name = 'formData'
        this.loadPriority = 1000
        this.startPriority = 1000
        this.stopPriority = 1000
    }

    async initialize() {
        api.FormDataRoom = 'defaultRoom'
        api.FormData = {
            title: '',
            type: '',
            description: '',
            tags: []
        }
    }

    async start () {
        if (await api.chatRoom.exists(api.FormDataRoom) === false) {
            await api.chatRoom.add(api.FormDataRoom)
            await api.chatRoom.addMiddleware(chatMiddleware)
        }
    }

    async stop () {
        await api.chatRoom.destroy(api.FormDataRoom)
    } 
}