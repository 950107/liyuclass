import React,{ Component } from 'react';
import {  Input,Button,Row,Col,List } from 'antd';

import store from './store/';

import './App.css';
// import 'antd/dist/antd.css';

class App extends Component{
	constructor(props){
		super(props)
		/*
		this.state = {
			list:['吃饭','睡觉','打豆豆'],
			task:''
		}
		*/
		this.handleChange=this.handleChange.bind(this)
		this.handleAdd=this.handleAdd.bind(this)
		
		this.state = store.getState()
		store.subscribe(() => this.setState(store.getState()))
	}
	handleAdd(){
		this.setState((preState)=>({
			list:[...preState.list,preState.task],
			task:''
		}))
	}
	handleChange(ev){
		const task = ev.target.value
		/*const task = ev.target.value
		this.setState(()=>({
			task:task
		}))*/
		
		//派发action
		//action就是一个对象
		const action = {
			type:'change_item',
			payload:task
		}
		store.dispatch(action)

	}
	handleDel(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState(()=>({
			list
		}))
	}
	getItmes(){
		return this.state.list.map((item,index)=>{
			return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)} />
		})
	}
    render(){
        return (
        	<div className='App'>
        		<Row>
        		<Col span={18}>
	        	<Input
	        	 	onChange={this.handleChange} 
	        	 	value={this.state.task} 
	        	/>
	        	</Col>
	        	<Col span={6}>
	        	<Button 
		        	type="dashed"
			        onClick={this.handleAdd}
		        >提交</Button>
		        </Col>
		        </Row>
		        <List style={{marginTop:20}}
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => (
			        <List.Item
			        	onClick={this.handleDel.bind(this,index)}
			        >
			        	{item}
			        </List.Item>
			      )}
			    />
	        </div>
	        )
    }
}

export default App