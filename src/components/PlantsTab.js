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
    deletePlant(delPlant) {
        let plantsList = this.state.plants.filter((item) => item.id == delPlant); /*???????????????*/
    }
    findIt() {
        let finalUrl = "https://s.ics.upjs.sk/mmarcincin_api/api/plants/" + this.props.searchInfo.finder + "/" + this.props.searchInfo.family + "/";
        if (this.props.genus != "") finalUrl += this.props.searchInfo.genus + "/";
        if (this.props.species != "") finalUrl += this.props.searchInfo.species + "/";
        if (this.props.tissue != "") finalUrl += this.props.searchInfo.tissue + "/";

        return finalUrl;
    }
    reload() {
        axios.get(this.findIt())
            .then(response => {
                this.setState({
                    plants: response.data
                })
            });
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
                    <td>{plant.species}</td>
                    <td>{plant.genus}</td>
                    <td>{plant.family}</td>
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
                        <PlantInfo plant={this.state.plant} handleBack={() => this.handleBackPlants()} delFromList={() => this.deletePlant()} reload={()=>{this.reload()}} />
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
                                        <th>Species</th>
                                        <th>Genos</th>
                                        <th>Family</th>
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
