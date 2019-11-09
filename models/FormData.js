const { api } = require('actionhero')
const async = require('async')

const formDataRoom = 'formDataRoom'
const formDataKey = 'formData'

const getFormData = async () => {
    return new Promise((resolve, reject) => {
        api.redis.clients.client.hgetall(formDataKey, (err, res) => {
            if (err) {
                return reject(err)
            }
            const formData = {
                title: res.title || '',
                type: res.type || '',
                description: res.description || '',
                tags: res.tags && res.tags.split(',') || []
            }
            resolve(formData)
        })
    })
}

const updateFormData = async data => {
    const keys = ['title', 'type', 'description', 'tags']
    const keyValues = []  
    
    keys.forEach(key => {
        if (data[key] === undefined) {
            return
        }
        keyValues.push({key, value:data[key]})
    })

    await new Promise((resolve, reject) => {
        async.every(keyValues, (item, callback) => {
            const value = Array.isArray(item.value) ? item.value.join(',') : item.value
            api.redis.clients.client.hmset(formDataKey, item.key, value, callback)
        }, (err, res) => err ? reject(err) : resolve(res))
    })

    return await getFormData()
}

module.exports = {formDataRoom, formDataKey, getFormData, updateFormData}