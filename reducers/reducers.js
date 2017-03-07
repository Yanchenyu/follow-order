import {combineReducers} from 'redux'

const tenantReducer =  (state = '', action) => {
	switch(action.type){
		case 'GET_TENANTS':
			return action.tenant;
			break;
		default:
			return state;
			break;
	}
}

const orderReducer = (state = "", action) => {
	switch (action.type){
		case "ORDER_DATA":
			return action.data;
			break;
		default:
			return state;
			break;
	}
}

let reducers = combineReducers({
	tenant: tenantReducer,
	orderStatus: orderReducer
})

export default reducers;