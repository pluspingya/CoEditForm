const {Action, api} = require('actionhero')

module.exports = class UpdateForm extends Action {
    constructor () {
        super()
        this.name = 'updateForm'
        this.description = 'I will update form data and return a full form data'
        this.inputs = {
            title: { required: false },
            type: { required: false },
            description: { required: false },
            tags: { required: false, validator: this.tagsValidator },
        }
        this.outputExample = {
            formData: {
                title: 'Example title',
                type: 'blog',
                description: 'Example description',
                tags: ['welcome', 'introduction']
            }            
        }        
    }

    tagsValidator (param) {
        if (typeof param !== `object` || param.length === undefined) {
            throw new Error('tags should be an Array type')
        }
    }

    async run (data) {
        const formData = api.FormData
        const keys = ['title', 'type', 'description', 'tags']
        keys.forEach(key => {
            if (data.params[key] === undefined) {
                return
            }
            formData[key] = data.params[key]
        })
        api.FormData = formData

        const roomStatus = await api.chatRoom.roomStatus(api.FormDataRoom)
        const response = {formData, roomStatus}
        console.log(response)
        data.response = response
        await api.chatRoom.broadcast(data.connection, api.FormDataRoom, response)
    }
}