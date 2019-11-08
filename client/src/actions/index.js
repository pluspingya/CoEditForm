import {
    FORM_LOAD,
    FORM_UPDATE,
} from './types'

export const loadFormWS = (client) => async dispatch => {
    client.action('loadForm', {}, data =>  {
        console.log(data)
        dispatch({type: FORM_LOAD, payload: data})
    })
}

export const updateFormWS = (client, {title, type, description, tags}) => async dispatch => {
    const params = {title, type, description, tags}
    client.action('updateForm', params, (data) => {
        dispatch({type: FORM_UPDATE, payload: data})
    })
}

export const storeDispatch = data => async dispatch => {
    console.log(data.message)
    dispatch({type: FORM_UPDATE, payload: data.message})
}