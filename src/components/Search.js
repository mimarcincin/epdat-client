import React, { Component } from "react";
import { Button, Form } from "reactstrap";
import SelectSearch from 'react-select-search';
import families from "./data/familyObjects.json";
import "./styles/Search.css";
import PlantsTab from "./PlantsTab";
import "../App.css"

class SearchForm extends Component {
    constructor() {
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeFamilyHandler = this.changeFamilyHandler.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.addSearchInfo = this.addSearchInfo.bind(this);
    }
    componentDidMount() {
        this.setState({
            isPlants: false
        })
    }
    state = {
        family: "",
        genus: "",
        species: "",
        tissue: "",
        familyList: families,
        isPlants: false,
        finder: "",
        genusDis: true,
        speciesDis: true,
        tissueDis: true,
        submitDis: true,
    }
    submitHandler(event) {
       /* event.preventDefault();*/

        let finalFinder = "F";

        if (this.state.genus != "") finalFinder += "G";
        if (this.state.species != "") finalFinder += "S";
        if (this.state.tissue != "") finalFinder += "T";

        this.setState({ finder: finalFinder, isPlants: !this.state.isPlants });

    }
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value })
        if (this.state.genus != "")
            this.setState({ speciesDis: false })

    }
    changeFamilyHandler(fam) {
        this.setState({ family: fam });
        this.setState({ genusDis: false, tissueDis: false, submitDis: false })

    }
    handleBack() {
        this.setState({ isPlants: !this.state.isPlants })
    }
    clearSearch() {
        this.setState({
            family: "",
            genus: "",
            species: "",
            tissue: "",
            genusDis: true,
            speciesDis: true,
            tissueDis: true
        })
    }
    render() {



        return (
            <div>
                {!this.state.isPlants ? (
                    <Form onSubmit={this.submitHandler} id="searchForm" class="SearchPlantForm">

                        <label>
                            

                            Family: <SelectSearch search={true} options={this.state.familyList} name="family" placeholder="Choose your Family" onChange={this.changeFamilyHandler} value={this.state.family} />
                            
                            Genus:
                            <br />
                            <input id="genusInput" type="text" name="genus" onChange={this.changeHandler} value={this.state.genus} disabled={this.state.genusDis} />
                            <br />
                            Species:
                            <br />
                            <input id="speciesInput" type="text" name="species" onChange={this.changeHandler} value={this.state.species} disabled={this.state.speciesDis} />
                            <br />
                            Tissue:
                            <br />
                            <input id="tissueInput" type="text" name="tissue" onChange={this.changeHandler} value={this.state.tissue} disabled={this.state.tissueDis} />
                        </label>
                        <br />
                        <Button onClick={() => { this.clearSearch() }}>Clear</Button>
                     {/*   <input class="button" type="submit" value="Search" disabled={this.state.submitDis} />*/}
                        <Button id="buttonImportant" onClick={() => { this.submitHandler() }} disabled={this.state.submitDis}>Search</Button>




                    </Form>) : (
                        <div class="divClassic">
                            <PlantsTab searchInfo={this.addSearchInfo()} />
                            <hr/>
                            <Button onClick={() => { this.handleBack() }}>Back to search</Button>
                            
                        </div>
                    )}


            </div>
        )
    }
    addSearchInfo() {
        let searchInfo = {
            family: this.state.family,
            genus: this.state.genus,
            species: this.state.species,
            tissue: this.state.tissue,
            finder: this.state.finder
        }
        return searchInfo;
    }


}


export default SearchForm;