import reducers from '../reducers/reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'


let initState = {
	tenant:[],
	orderStatus:{
		columns:[],
		dataSource:[],
		pagination:{
			total:0
		},
		loading:true
	}
};

let store = createStore(
	reducers,
	initState,
	applyMiddleware(thunk)
);

export default store