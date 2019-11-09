const {Initializer, api} = require('actionhero')
const {formDataRoom} = require('../models/FormData')
const FormDataChatMiddleware = require('../middlewares/FormDataChatMiddleware')

module.exports = class FormDataInit extends Initializer {
    constructor () {
        super()
        this.name = 'FormDataInit'
        this.loadPriority = 1000
        this.startPriority = 1000
        this.stopPriority = 1000
    }

    async start () {
        if (await api.chatRoom.exists(formDataRoom) === false) {
            await api.chatRoom.add(formDataRoom)
        }
        await api.chatRoom.addMiddleware(FormDataChatMiddleware)
    }

    async stop () {
        if (await api.chatRoom.exists(formDataRoom)) {
            await api.chatRoom.destroy(formDataRoom)
        }
    } 
}