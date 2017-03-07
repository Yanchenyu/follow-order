import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions/action'
import $ from 'jquery'
import { Table,Icon,Button } from 'antd'
import Title from './title'
import config from './config'
import { Link } from 'react-router';

const { Column } = Table;
const serverUrl = config.serverUrl;

let OrderStatus = React.createClass({
	getDefaultProps(){
		if(sessionStorage.getItem("orderStatus")){

		}
	},
	getInitialState() {
		let tenants = this.props.tenant;
		return {
			jgzj:[],
			ddh:[],
			status:['未完工','已完工'],
			defaultOrderNum:'全部',
			tenant:tenants
		}	
	},
	componentDidMount(){
		let that = this;
		let tenants;
		if(sessionStorage.getItem("tenants")){
			tenants = JSON.parse(sessionStorage.getItem("tenants"));
		}else{
			tenants = this.props.tenant;
			sessionStorage.setItem("tenants", JSON.stringify(tenants));
		}
		
		let mobile = localStorage.getItem("phoneNumber");
		let list = {
			tenant : JSON.stringify(tenants),
			mobile : mobile,
			jgzj:'全部',
			ddh:'全部',
			status:'全部'
		};
		this.props.dispatch(actions.orderAsync(list));
		$.ajax({
			url:serverUrl + '/getOrderStatusSelect',
			type:'get',
			data:{
				tenant:JSON.stringify(tenants),
				mobile:mobile
			},
			dataType:'jsonp',
			jsonp:'callback',
			success:function(data){
				that.setState({
					ddh:data.ddh,
					jgzj:data.jgzj
				});
			}
		});
	},
	handleClick(){
		let tenants = this.props.tenant;
		let mobile = localStorage.getItem('phoneNumber');
		let selectTenant = document.getElementById('zh').value;
		if(selectTenant == '全部'){
			var sendTenant = tenants;
		}else{
			var sendTenant = [selectTenant];
		};
		this.props.dispatch(actions.orderAsync({
			jgzj:document.getElementById('jgzj').value,
			ddh:document.getElementById('ddh').value,
			status:document.getElementById('zt').value,
			mobile:mobile,
			tenant:JSON.stringify(sendTenant)
		}))

	},
	render(){
		return (
			<div>
				<Title />
				<nav>
					<div className='selection'>
						<span>订单号 : </span>
						<select className='select' id='ddh' defaultValue={this.state.defaultOrderNum}>
							<option value='全部'>全部</option>
							{
								this.state.ddh.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>结构直径 : </span>
						<select className='select' id='jgzj' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.jgzj.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>状态 : </span>
						<select className='select' id='zt' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.status.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<div className='selection'>
						<span>租户 : </span>
						<select className='select' id='zh' defaultValue='全部'>
							<option value='全部'>全部</option>
							{
								this.state.tenant.map(function(item){
									return <option key={item} value={item}>{item}</option>
								})
							}
						</select>
					</div>
					<Button className="search" type="primary" icon="search" onClick={this.handleClick}>查询</Button>
				</nav>
				<Table
					dataSource={this.props.orderStatus.dataSource}
					loading={this.props.orderStatus.loading}
					scroll={{ x: config.orderStatusScroll}}
					pagination={{
						total:this.props.orderStatus.pagination.total,
						showSizeChanger:true,
						pageSizeOptions:config.pageSizeOptions
					}}
				>
					{
						this.props.orderStatus.columns.map(function(item){
							return  <Column
										title={item.title}
										dataIndex={item.dataIndex}
										key={item.title}
									>
									</Column>
						})
					}
							<Column
								title='操作'
								key='action'
								render={(text, record) => (
									<Link to={
										{
											pathname:'/combineProductPlan',
											query:{
												id:record.id,
												jgzj:record.jgzj,
												status:record.status,
												cpbh:record.cpbh,
												lx:record.lx,
												tenant:record.tenant
											}
										}
									}>
										查看
									</Link>
								)}
							>
							</Column>
							<Column
								title="步骤图"
								key='actions'
								render={(text, record) => (
									<Link to={
										{
											pathname:'/progress',
											query:{
												id:record.id,
												jgzj:record.jgzj,
												status:record.status,
												cpbh:record.cpbh,
												lx:record.lx,
												tenant:record.tenant
											}
										}
									}>
										查看
									</Link>
								)}
							>
							</Column>
				</Table>
			</div>
		)
	}
});
const mapStateToProps = (state) =>{
	return {
		tenant: state.tenant,
		orderStatus: state.orderStatus 
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions,dispatch)
	}
}

OrderStatus = connect(mapStateToProps)(OrderStatus);

export default OrderStatus;