import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from 'axios';
import PlantInfo from "./PlantInfo";
import "../App.css"

class PlantsTab extends Component {
    state = {
        plants: [],
        searchInfo: "",
        isPlant: false,
        plant:{},
    }
    constructor(){
        super()
        this.openLogin = this.openLogin.bind(this)
    }
    deletePlant(delPlant) {
        let plantsList = this.state.plants.filter((item) => item.id == delPlant); /*???????????????*/
    }
    findIt() {
        let finalUrl = global.url + this.props.searchInfo.finder
        switch(this.props.searchInfo.finder){
        case "F" : finalUrl+="/"+this.props.searchInfo.family;console.log("final url: "+ finalUrl);break;
        case "G" : finalUrl+="/"+this.props.searchInfo.genus;console.log("final url: "+ finalUrl);break;
        case "S" : finalUrl+="/"+this.props.searchInfo.species;console.log("final url: "+ finalUrl);break;
        case "T" : finalUrl+="/"+this.props.searchInfo.tissue;console.log("final url: "+ finalUrl);break;
        case "FT" : finalUrl+="/"+this.props.searchInfo.family+"/"+this.props.searchInfo.tissue;console.log("final url: "+ finalUrl);break;
        case "GT" : finalUrl+="/"+this.props.searchInfo.genus+"/"+this.props.searchInfo.tissue;break;
        }
        console.log("final url: "+ finalUrl);
      //  finalUrl = finalUrl.slice(0, -1);
        console.log("final url: "+ finalUrl);
        return finalUrl;
    }
    reload() {
        axios.get(this.findIt(), {headers:{"Access-Control-Allow-Origin" : "*"}})
            .then(response => {
                this.setState({
                    plants: response.data
                })
            });
    }

    openLogin(){
        this.props.openLogin()
    }
    componentDidMount() {
        this.setState({ isPlant: false });
        this.reload();
    }

    plantClicked(plant) {
        this.setState({ isPlant: true, plant: plant })
    }

    handleBackPlants() {
        this.setState({ isPlant: false })
    }

    render() {
        let plants = this.state.plants.map((plant) => {
            return (
                <tr key={plant.id} >
                    <td>{plant.id}</td>
                    <td>{plant.family}</td>
                    <td>{plant.species}</td>
                    <td>{plant.genus}</td>
                    <td>{plant.authority}</td>
                    <td>{plant.notice}</td>
                    { /*   <td>{plant.createdAt}</td>
                    <td>{plant.updatedAt}</td> */}
                    <td><Button onClick={() => this.plantClicked(plant)}>Open</Button></td>
                </tr>

            )

        });
        return (
            <div className="App container">
                {this.state.isPlant ? (
                    <div class="divClassic">
                        <PlantInfo plant={this.state.plant} handleBack={() => this.handleBackPlants()} delFromList={() => this.deletePlant()} 
                        reload={()=>{this.reload()}} openLogin={this.props.openLogin}/>
                        <hr/>
                        <Button onClick={() => this.handleBackPlants()}>Back to plants</Button>
                        <br/>
                    </div>
                ) : (
                        <div>{/*<Button onClick={() => this.reload()}>Reload table</Button>*/}
                            <Table class="ReactTable">

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Family</th>
                                        <th>Genus</th>
                                        <th>Species</th>
                                        <th>Authority</th>
                                        <th>Notice</th>
                                        <th/>
                                        {/* <th>Created at</th>
                            <th>Updated at</th>*/}
                                    </tr>
                                </thead>

                                <tbody>
                                    {plants}
                                </tbody>


                            </Table></div>
                    )}

            </div>
        )
    }
}

export default PlantsTab;
