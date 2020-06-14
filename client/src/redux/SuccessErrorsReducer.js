export const GET_ERRORS = "GET_ERRORS"
export const CLEAR_ERRORS = "CLEAR_ERRORS"
export const GET_SUCCESS = "GET_SUCCESS"
export const CLEAR_SUCCESS = "CLEAR_SUCCESS"


const initialState = {
    successMessage: {
        message: null,
        status: null,
        id: null
    },
    errorsMessage: {
        message: null,
        status: null,
        id: null
    }
}


const SuccessErrorReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_ERRORS: {
            return {
                errorsMessage: {message:action.payload.message,status:action.payload.status,id:action.payload.id}
            }
        }
        case GET_SUCCESS:{
            return {
                successMessage: {message:action.payload.message,status:action.payload.status,id:action.payload.id}
            }
        }
        case CLEAR_ERRORS: {
            return initialState
        }
        case CLEAR_SUCCESS: {
            return initialState
        }
        default: return state;
    }
}


export const clearErrors = () => ({ type: CLEAR_ERRORS })
export const clearSuccess = () => ({ type: CLEAR_SUCCESS })
export const returnErrors = (message, status, id = null) => ({ type: GET_ERRORS, payload: { message, status, id } })
export const returnSuccess = (message, status, id = null) => ({ type: GET_SUCCESS, payload: { message, status, id } })


export default SuccessErrorReducer