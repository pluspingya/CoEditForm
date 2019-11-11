import {
    FORM_LOAD,
    FORM_UPDATE,
} from './types'

export const loadFormWS = (client) => async dispatch => {
    client.action('loadForm', {}, data => dispatch({type: FORM_LOAD, payload: data}))
}

export const updateFormWS = (client, {title, type, description, tags}) => async dispatch => {
    const params = {title, type, description, tags}
    client.action('updateForm', params, data => dispatch({type: FORM_UPDATE, payload: data}))
}

export const updateFormDispatch = data => async dispatch => {
    dispatch({type: FORM_UPDATE, payload: data.message})
}