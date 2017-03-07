import React from 'react'
import {render} from 'react-dom'
import {Progress} from 'antd'
import Title from './title'
import load from '../images/load.gif'
import $ from 'jquery'
import config from './config'

const serverUrl = config.serverUrl;

let ProgressComponent = React.createClass({
	getInitialState(){
		return {
			list:[],
			isLoad:{
				'display':'block'
			}
		}
	},
	componentDidMount() {
		let that = this;
		let query = this.props.location.query;
		$.ajax({
			url:serverUrl+'/getStepData',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:query,
			success:function(data){
				let msg = data.data;
				that.setState({
					list:msg,
					isLoad:{
						'display':'none'
					}
				});
			}
		});
	},
	render(){
		return (
			<div>
				<Title/>
				<div className='progress-container'>
					{
						this.state.list.map(function(item){

							return 	<div className='product-list-progress' key={item.title + item.description}>
										<div className='product-name'>
											<span className='product-title'>{item.title}</span>
											{' ( ' + item.description + ' )'}
										</div>
										<div className='product-progress'>
											<Progress percent={item.progress} status="active"/>
										</div>
									</div>
						})
					}
				</div>
				<div className='loading' style={this.state.isLoad}>
					<img src={load}/>
				</div>
			</div>
		)
	}
});

export default ProgressComponent;