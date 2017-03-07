import React from 'react'
import {render} from 'react-dom'
import Title from './title'
import actions from '../actions/action'
import $ from 'jquery'
import { Table } from 'antd'
import config from './config'
import { Link } from 'react-router';

const {Column} = Table;
const serverUrl = config.serverUrl;


let CombineProductPlan = React.createClass({
	getInitialState() {
		return {
			columns:[
				{
					title:'工段制造号',
					dataIndex:'gdzzh'
				},
				{
					title:'结构-直径',
					dataIndex:'jgzj'
				},
				{
					title:'类别',
					dataIndex:'lb'
				},
				{
					title:'强度(Mpa)',
					dataIndex:'qd'
				},
				{
					title:'表面状态',
					dataIndex:'bmzt'
				},
				{
					title:'捻向',
					dataIndex:'nx'
				},
				{
					title:'段长',
					dataIndex:'dc'
				},
				{
					title:'段数',
					dataIndex:'ds'
				},
				{
					title:'单件米长',
					dataIndex:'djmc'
				},
				{
					title:'重量',
					dataIndex:'zl'
				},
				{
					title:'总件数',
					dataIndex:'zjs'
				},
				{
					title:'已完成件数',
					dataIndex:'ywcjs'
				},
				{
					title:'不合格件数',
					dataIndex:'bhgjs'
				},
				{
					title:'未完成件数',
					dataIndex:'wwcjs'
				},
				{
					title:'可用存量',
					dataIndex:'kycl'
				},
				{
					title:'预计完成时间',
					dataIndex:'yjwcsj'
				},
				{
					title:'状态',
					dataIndex:'zt'
				},
				{
					title:'在制机台数',
					dataIndex:'zzjts'
				}
			],
			dataSource:[],
			pagination:{
				total:0
			},
			loading:true
		}	
	},
	componentDidMount() {
		let query = this.props.location.query;
		let that = this;
		$.ajax({
			url:serverUrl+'/getOrderStatusDetail',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:query,
			success:function(data){
				console.log(data);
				that.setState({
					dataSource:data,
					pagination:{
						total:data.length
					},
					loading:false
				});
			}
		});	
	},
	render(){
		return (
			<div>
				<Title></Title>
				<Table
					dataSource={this.state.dataSource}
					scroll={{x: config.orderStatusScroll}}
					loading={this.state.loading}
					pagination={{
						total:this.state.pagination.total,
						showSizeChanger:true,
						pageSizeOptions:config.pageSizeOptions
					}}
				>
					{
								this.state.columns.map(function(item){
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
						render={(text,record) => {
							if(record.gdzzh!=""){
								return (
									<Link to={
											{
												pathname: '/workPlanMachineDetail',
												query:{
															gdzzh:record.gdzzh,
															tenant:record.tenant
													}
											}
										}
									>
										查看
									</Link>
								)
							}else{
								return (
									<a></a>
								)
							}
							
						}
					}
					>
						
					</Column>
				</Table>
			</div>
		)
	}
});


export default CombineProductPlan;