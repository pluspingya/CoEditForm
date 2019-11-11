const { Action, api } = require('actionhero')
const { formDataRoom, updateFormData } = require('../models/FormData')

module.exports = class UpdateForm extends Action {
  constructor () {
    super()
    this.name = 'updateForm'
    this.description = 'I will update form data and return a full form data'
    this.inputs = {
      title: { required: false },
      type: { required: false },
      description: { required: false },
      tags: { required: false, validator: this.tagsValidator }
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
    if (typeof param !== 'object' || param.length === undefined) {
      throw new Error('tags should be an Array type')
    }
  }

  async run (data) {
    const formData = await updateFormData({
      title: data.params.title,
      type: data.params.type,
      description: data.params.description,
      tags: data.params.tags
    })
    const roomStatus = await api.chatRoom.roomStatus(formDataRoom)
    const response = { formData, roomStatus }
    data.response = response
    await api.chatRoom.broadcast(data.connection, formDataRoom, response)
  }
}
