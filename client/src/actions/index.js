// import axios from 'axios'

import {
    FORM_LOAD,
    FORM_UPDATE,
} from './types'

// export const loadForm = () => async dispatch => {
//     const res = await axios.get('/api/loadForm')
//     dispatch({type: FORM_LOAD, payload: res.data})
// }

export const loadFormWS = (client) => async dispatch => {
    client.action('loadForm', {}, data => dispatch({type: FORM_LOAD, payload: data}))
}

// export const updateForm = ({title, type, description, tags}) => async dispatch => {
//     const params = {title, type, description, tags}
//     const res = await axios.post('/api/updateForm', params)
//     dispatch({type: FORM_UPDATE, payload: res.data})
// }

export const updateFormWS = (client, {title, type, description, tags}) => async dispatch => {
    const params = {title, type, description, tags}
    client.action('updateForm', params, (data) => {
        dispatch({type: FORM_UPDATE, payload: data})
    })
}

export const storeDispatch = data => async dispatch => {
    console.log(data)
    const payload = {formData: data.message}
    dispatch({type: FORM_UPDATE, payload})
}