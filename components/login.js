import React from 'react'
import {render} from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions/action.js'
import {Button, Input, Icon} from 'antd'
import headerImage from '../images/header.png'
import $ from 'jquery'



let Login = React.createClass({
	getInitialState(){
		let width = $(window).width(),
			height = $(window).height();
		return {
			phoneNumber: localStorage.getItem("phoneNumber")?localStorage.getItem("phoneNumber"):"",
			size: {
				"width": width,
				"height": height
			}

		}
	},
	handleChange(e){
		let number = e.target.value;
		this.setState({
			phoneNumber: number
		});
		
		
	},
	handleKeyUp(e){
		if(e.keyCode == 13){
			this.handleClick()
		}
	},
	handleClick(){
		let number = this.state.phoneNumber,
			phoneInput = $("#phoneInput");
		if(number==""){
			alert("用户不能为空！");
			$(phoneInput).focus();
		}else if(isNaN(number)||number.length!=11){
			alert("请输入正确的手机格式");
			this.setState({
				phoneNumber:""
			});
			$(phoneInput).focus();
		}else{
			this.props.dispatch(actions.loginAsync(number))
		}
		
	},
	render(){
		return (
			<div className='container' style={this.state.size}>
				<div className='logo'>
					<img className='headerImage' src={headerImage}/>
				</div>
				<h1>客户跟单</h1>
				<div className='phoneNumber'>
					<Input id='phoneInput' type="text" value={this.state.phoneNumber} placeholder='Enter your username' prefix={<Icon type="user" />} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
				</div>
				<Button size='large' type="primary" id='login' className='login' onClick={this.handleClick}>登录</Button>
			</div>
			
		)
	}

})


const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions,dispatch)
	}
}

Login = connect(mapStateToProps)(Login)

export default Login;