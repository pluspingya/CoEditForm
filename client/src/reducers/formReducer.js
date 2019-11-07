import { 
    FORM_LOAD, 
    FORM_UPDATE 
} from '../actions/types'

export default (state = null, action) => {
    switch(action.type) {
        case FORM_LOAD:
        case FORM_UPDATE:
            return {formData: action.payload.formData}
        default: 
            return state
    }
}