import React from 'react';
import $ from 'jquery';
import { Table } from 'antd';
import Title from './title';
import config from './config';

const { Column } = Table;
const serverUrl = config.serverUrl;

let WorkPlanMachineDetail = React.createClass({
	getInitialState() {
		return {
			columns:[
				{
					title:'机台号',
					dataIndex:'jth'
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
					title:'计划完成时间',
					dataIndex:'jhwcsj'
				},
				{
					title:'实际完成时间',
					dataIndex:'sjwcsj'
				},
				{
					title:'状态',
					dataIndex:'zt'
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
		let that = this;
		let query = this.props.location.query;
		$.ajax({
			url:serverUrl+'/getOrderStatusJth',
			type:'get',
			dataType:'jsonp',
			jsonp:'callback',
			data:query,
			success:function(data){
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
				<Title/>
						<Table
							dataSource={this.state.dataSource}
							loading={this.state.loading}
							scroll={{ x: config.orderStatusScroll}}
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
						</Table>


			</div>
		)
	}
});

export default WorkPlanMachineDetail;	