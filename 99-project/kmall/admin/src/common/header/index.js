import React, { Component } from 'react'

import { Layout, Menu, Icon, Dropdown } from 'antd';
const { Header } = Layout;

import {getUsername,removeUsername} from 'util'

import axios from 'axios'

import "./index.css"

class AdminHeader extends Component {
    constructor(props){
      super(props)
      this.handelLogout = this.handelLogout.bind(this)
    }
    handelLogout(){
      axios({
        method:'delete',
        url:'http://127.0.0.1:3000/sessions/users'
      })
      .then(result=>{
        if(result.data.code == 0){
          removeUsername()
          window.location.href = '/login'
        }
      })
    }
    render() {
        const menu = (
          <Menu onClick={ this.handelLogout } >
            <Menu.Item key="1">
              <Icon type='logout' />退出
            </Menu.Item>
          </Menu>
        );
                return (
          <div className="AdminHeader">
              <Header className="header">
                <div className="logo">
                  KMALL
                </div>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    {getUsername()}<Icon type="down" />
                  </a>
                </Dropdown>
              </Header>
          </div>
        )
    }
}



export default AdminHeader