import $ from 'jquery'
import config from '../components/config'
import {createHashHistory} from 'history'

const history = createHashHistory();
const serverUrl = config.serverUrl;

let loginAsync = (phoneNumber) => {
	return function(dispatch, getState){
		$.ajax({
			type: 'get',
			url: serverUrl+'/checkMobile',
			data: {
				mobile: phoneNumber
			},
			dataType: 'jsonp',
			jsonp:'callback',
			success: function(data){
				if(data.code == 200 ){
					localStorage.setItem("phoneNumber",data.data.mobile)
					dispatch(loginAction(data.data.userTenants));
					history.replace('/orderStatus');
				}else if(data.code == 404){
					alert("不存在该用户")
				}
				
			}
		})
	}
}

let loginAction = (tenants) => {
	return {
		type: 'GET_TENANTS',
		tenant: tenants
	}
}

let orderAsync = (list) => {
	return function(dispatch, getState){
		$.ajax({
			url:serverUrl + '/getOrderStatus',
			type:'get',
			data:list,
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				console.log(data);
				let orderStatus = data.data.orderStatus;
				dispatch(orderAction(orderStatus))
			}
		})
	}
}

let orderAction = (data) => {
	return {
		type: "ORDER_DATA",
		data: data
	}
	
}


export default {loginAsync,orderAsync}