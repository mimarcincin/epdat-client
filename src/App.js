import React, { Component } from "react";
import { Table, Button, Modal, Form, ModalHeader, ModalBody } from "reactstrap";
import axios from 'axios';
import "./App.css";

import Home from "./components/Home";
import PlantsTab from "./components/PlantsTab";
import PlantInfo from "./components/PlantInfo";
import RecordsTab from "./components/RecordsTab";
import RecordInfo from "./components/RecordInfo";
import SearchForm from "./components/Search";
import AddPlant from "./components/AddPlant";
import AddRecord from "./components/AddRecord";
import LoginModal from "./components/LoginModal";

class App extends Component {
	state = {
		isHome: true,
		componentName: {},
		isAddPlant: false,
		isLogin: false,
		isLogged: false,
	}

	constructor() {
		super();
		this.handleComponentName = this.handleComponentName.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.openLogin = this.openLogin.bind(this);
	}
	componentDidMount(){
		this.setState({isLogin:false})
	}

	handleComponentName = (change) => {
		if(global.token==""&&(change==AddPlant)){this.setState({isLogin:true})} else{
		this.setState({ componentName: change, isHome: false });
		}
	}
	handleBack() {
		this.setState({ isHome: true });
	}
	handleBackFromLogin(){
		if(global.token!=""){
		this.setState({isLogin:false})
		this.handleBack()
		this.handleComponentName(this.state.componentName)
		this.setState({isLogged : true})} else {
		this.setState({isLogin:false})}
	}
	openLogin(){
		this.setState({isLogin:true})
	}
	render() {
		return (
			<div className="App">
				<header class="App-header">
					<h1>Databáza endopolyploidie</h1>
					<Button class="floated" onClick={() => {this.setState({isLogin:true})}}>Login</Button>
					<Button id="floated" onClick={() => { this.handleBack() }}> Home </Button>
					<Button class="floated" onClick={() => { this.handleComponentName(AddPlant) }}>Add Plant</Button>
					
				</header>

				{this.state.isHome ? (

				<div class="App-body">
					<br />
					<h2>Welcome</h2>
					<Button onClick={() => { this.handleComponentName(SearchForm) }}> Search </Button>
				</div>
				) : (
						<this.state.componentName class="divClassic" handleBack={this.handleBack} isLogged={this.state.isLogged} openLogin={this.openLogin}/>
						
					)}

					{this.state.isLogin ? (
						<LoginModal handleBackFromLogin={() =>{this.handleBackFromLogin()}}/>
					):(<div/>)}
					
	
			</div>

		)

	}
}
export default App;
