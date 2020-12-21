const initialstate = {    
    receipts: []    
};    
    
const reducer = (state = initialstate, action) => {    
    switch (action.type) {    
        case 'GET_RECEIPT':    
            return {    
                ...state    
            };    
        case 'ADD_RECEIPT':    
            return {    
                ...state,    
                receipts: state.receipts.concat(action.payload)    
            };    
        default:    
            return state;    
    }    
};    
    
export default reducer;