import React from 'react'
import {render} from 'react-dom'
import Login from './components/login'
import OrderStatus from './components/orderStatus'
import CombineProductPlan from './components/combineProductPlan'
import WorkPlanMachineDetail from './components/workPlanMachineDetail'
import ProgressComponent from './components/progress'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory } from 'react-router'
import store from './store/store.js'
import './style/app.css'

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' components={Login}></Route>
			<Route path='/orderStatus' components={OrderStatus}></Route>
			<Route path='/combineProductPlan' components={CombineProductPlan}></Route>
			<Route path='/workPlanMachineDetail' components={WorkPlanMachineDetail}></Route>
			<Route path='/progress' components={ProgressComponent}></Route>
		</Router>
	</Provider>,
	document.getElementById("root")
)