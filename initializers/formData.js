const {Initializer, api} = require('actionhero')

module.exports = class FormData extends Initializer {
    constructor () {
        super()
        this.name = 'formData'
        this.loadPriority = 1000
        this.startPriority = 1000
        this.stopPriority = 1000
    }

    async initialize() {
        api.FormData = {
            title: '',
            type: '',
            description: '',
            tags: []
        }
    }

    async start () {
        if (await api.chatRoom.exists('defaultRoom') === false) {
            await api.chatRoom.add('defaultRoom')
        }
    }

    async stop () {
        await api.chatRoom.destroy('defaultRoom')
    } 
}