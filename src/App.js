import React, { Component } from 'react';
import logo from './logo.svg';
import { BootstrapTable, TableHeaderColumn,InsertButton,DeleteButton } from 'react-bootstrap-table';
import './App.css';

class App extends Component {

    addTodo(event){
      event.preventDefault();
    }

    actionFormatter(cell, row){
      return <a className="btn-delete" onClick={this.removeUser.bind(this,row)}><span className="glyphicon glyphicon-remove"></span></a>
    }


    handleInsertButtonClick = (onClick) => {
      // Custom your onClick event here,
      // it's not necessary to implement this function if you have no any process before onClick
      console.log('This is my custom function for InserButton click event');
      onClick();
    }

    createCustomInsertButton = (onClick) => {
      return (
        <button className="btn btn-default btn-add" onClick={ onClick }>Add New</button>
      );
    }

    onAfterInsertRow(row) {
      let newRowStr = '';
      let lists = this.state.list;
      let index = lists.length+1;
      row.id = index;
      let obj = {
          id: index,
          name: row.name,
          email:row.email,
          phone:row.phone,
          address:row.address
      }
      delete row.action;
      lists.push(obj);
      this.setState({
         lists:lists
      });
    }


   getCaret(direction) {
    if (direction === 'asc') {
      return (
        <span className="glyphicon glyphicon-arrow-down"></span>
      );
    }
    if (direction === 'desc') {
      return (
        <span className="glyphicon glyphicon-arrow-up"></span>
      );
    }
    return (
      <span></span>
    );
  }

  removeUser(row){
  
    if(confirm("Are you sure to delete this row?")){

      let lists = this.state.list;
      let index = lists.findIndex(function(list){
          return list.id === row.id;
      });
      lists.splice(index,1);
      this.setState({
        lists: lists
      });
      
    }

    
  }

  nameValidator(value,row){
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Value must be inserted';
      response.notification.title = 'Requested Value';
    }
    return response;
  }



  emailValidator(value,row){
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Value must be inserted';
      response.notification.title = 'Requested Value';
    }
    else if(!re.test(value)){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'please Enter correct email.';
      response.notification.title = 'Invalid Email';
    }
    return response;
  }

  constructor(){
    super();
    this.addTodo = this.addTodo.bind(this);
    this.actionFormatter = this.actionFormatter.bind(this);
    this.nameValidator = this.nameValidator.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.getCaret = this.getCaret.bind(this);
    this.state = {
      cellEditProp : {
        mode: 'click',
        blurToSave: true
      },
      options : {insertBtn: this.createCustomInsertButton.bind(this),afterInsertRow: this.onAfterInsertRow.bind(this)},
      title:'List of participants',
      list:[{
            id: 1,
            name: "Abdul Basit",
            email: 'ab@gmail.com',
            address:'Bahria homes',
            phone:'040-123-1233'
        },{
            id: 2,
            name: "Ali",
            email: 'ali@gmail.com',
            address:'Bahria Town',
            phone:'040-126-1244'
        },
        {
            id: 3,
            name: "Zunej",
            email: 'zunej@gmail.com',
            address:'London',
            phone:'040-1246-1244'
        }],
    }
  }

  render() {
    return (
       <div className="App">
        <div className="row"><h1>{this.state.title}</h1></div>
        <div className="row add">
           <div className="form-inline">
              <div className="form-group">
              </div>
              <div className="form-group">
              </div>
              <div className="form-group">
              </div>
           </div>
        </div>
        <div className="row">
          <BootstrapTable  className="list" data={this.state.list} hover={true} options={this.state.options} insertRow cellEdit = {this.state.cellEditProp}>
            <TableHeaderColumn isKey={true} autoValue hidden={true} hiddenOnInsert dataField="id" deleteRow dataAlign="center" dataSort={true} caretRender={ this.getCaret }>Id</TableHeaderColumn>
            <TableHeaderColumn filter={ { type: 'TextFilter' } } editable={ { validator: this.nameValidator } } dataField="name" deleteRow dataAlign="center" dataSort={true} caretRender={ this.getCaret }>Name</TableHeaderColumn>
            <TableHeaderColumn filter={ { type: 'TextFilter' } } editable={ { validator: this.emailValidator } } dataField="email" dataAlign="center" dataSort={true} caretRender={ this.getCaret }>Email</TableHeaderColumn>
            <TableHeaderColumn filter={ { type: 'TextFilter' } } editable={ { validator: this.nameValidator } } dataField="phone"  dataAlign="center" dataSort={true} caretRender={ this.getCaret }>phone</TableHeaderColumn>
            <TableHeaderColumn filter={ { type: 'TextFilter' } } editable={ { validator: this.nameValidator } } dataField="address"  dataAlign="center" dataSort={true} caretRender={ this.getCaret }>Address</TableHeaderColumn>
            <TableHeaderColumn dataField="action" hiddenOnInsert  editable={ false } dataAlign="center" dataFormat={this.actionFormatter.bind(this)} >Action</TableHeaderColumn>
          </BootstrapTable>
        </div>
       </div>
    );
  }
}

export default App;
