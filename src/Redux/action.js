export function getReceipt() {  
    return dispatch => {  
        return dispatch({  
            type: 'GET_RECEIPT'  
        });  
    }  
};  
  
export function addReceipt(data) {  
    return dispatch => {  
        return dispatch({  
            type: 'ADD_RECEIPT',  
            payload: data  
        });  
    }  
};