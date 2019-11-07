const {Action, api} = require('actionhero')

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
        const formData = api.FormData
        console.log(formData)
        data.response = {formData}
    }
}