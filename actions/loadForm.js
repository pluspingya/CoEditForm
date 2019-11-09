const {Action, api} = require('actionhero')
const {formDataRoom, getFormData} = require('../models/FormData')

module.exports = class LoadForm extends Action {
    constructor () {
        super()
        this.name = 'loadForm'
        this.description = 'I will return a full form data'
        this.outputExample = {
            formData: {
                title: 'Example title',
                type: 'blog',
                description: 'Example description',
                tags: ['welcome', 'introduction']
            }            
        }
    }

    async run (data) {
        const formData = await getFormData()
        const roomStatus = await api.chatRoom.roomStatus(formDataRoom)
        const response = {formData, roomStatus}
        data.response = response
    }
}