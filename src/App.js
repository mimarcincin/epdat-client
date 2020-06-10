import React, { Component } from "react";
import { Table, Button, Modal, Form } from "reactstrap";
import axios from 'axios';
import "./App.css";

import Home from "./components/Home";
import PlantsTab from "./components/PlantsTab";
import PlantInfo from "./components/PlantInfo";
import RecordsTab from "./components/RecordsTab";
import RecordInfo from "./components/RecordInfo";
import SearchForm from "./components/Search";
import AddPlant from "./components/AddPlant";

class App extends Component {
	state = {
		isHome: true,
		componentName: {},
		isAddPlant: false,
	}

	constructor() {
		super();
		this.handleComponentName = this.handleComponentName.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	handleComponentName = (change) => {
		this.setState({ componentName: change, isHome: false });

	}
	handleBack() {
		this.setState({ isHome: true });
	}

	render() {

		return (
			<div className="App">

				<header class="App-header">
					<h1>Databáza endopolyploidie</h1>
				
					<Button id="floated" onClick={() => { this.handleBack() }}> Home </Button>
					<Button class="floated" onClick={() => { this.handleComponentName(AddPlant) }}>Add Plant</Button>
					
				</header>

				{this.state.isHome ? (

				<div class="App-body">
					<br />
					<h2>Hello and welcome</h2>
					<Button onClick={() => { this.handleComponentName(SearchForm) }}> Search </Button>
				</div>
				) : (
						<this.state.componentName class="divClassic" handleBack={this.handleBack} />
					)}

			</div>

		)

	}
}
export default App;
