import React, { Component } from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, Alert } from "reactstrap";
import SelectSearch from 'react-select-search';
import families from "./data/familyObjects.json";
import "./styles/Search.css";
import "../App.css";
import PlantsTab from "./PlantsTab";
import Axios from "axios";

class AddPlantModal extends Component {
    constructor() {
        super();
        this.changeFamilyHandler = this.changeFamilyHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
    }

    state = {
        familyList: families,
        family: "",
        genus: "",
        species: "",
        authority: "",
        notice: "",
        submitDisabled: true,
        formSuccess: false,

    }
    changeFamilyHandler(fam) {
        this.setState({ family: fam, formSuccess: false });
    }
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value, formSuccess: false })
        if (this.state.family !== "" && this.state.genus !== "" && this.state.species !== "" && this.state.authority !== "") { this.setState({ submitDisabled: false }) } else { this.setState({ submitDisabled: true }) }
    }
    submitHandler(event) {
        /*event.preventDefault();*/
        let plant = {
            "family": this.state.family,
            "genus": this.state.genus,
            "species": this.state.species,
            "authority": this.state.authority,
            "notice": this.state.notice,
        }
        Axios.post("https://s.ics.upjs.sk/mmarcincin_api/api/plants/", plant).then(res => console.log(res));
        this.setState({
            formSuccess: true,
            genus: "",
            species: "",
            authority: "",
            notice: "",
            submitDisabled: true,
        })

    }

    render() {
        return (
            <Modal isOpen={true} >
                <ModalHeader>
                    Add species to database
                    <br/>
                    
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitHandler} id="addPlantForm">
                        <label>
                            <br />

                            Family: <SelectSearch search={true} options={this.state.familyList} name="family" placeholder="Choose your Family" onChange={this.changeFamilyHandler} />
                            
                            Genus:
                            <br />
                            <input id="genusInput" type="text" name="genus" onChange={this.changeHandler} value={this.state.genus} />
                            <br />
                            Species:
                            <br />
                            <input id="speciesInput" type="text" name="species" onChange={this.changeHandler} value={this.state.species} />
                            <br />
                            Authority:
                            <br />
                            <input id="authorityInput" type="text" name="authority" onChange={this.changeHandler} value={this.state.authority} />
                            <br />
                            Notice:
                            <br />
                            <input id="noticeInput" type="text" name="notice" onChange={this.changeHandler} value={this.state.notice} />

                        </label>
                        <br />

                        {/*<input type="submit" value="Add Plant" disabled={this.state.submitDisabled} />*/}
                        <Button id="buttonImportant" onClick={() => { this.submitHandler() }} disabled={this.state.submitDisabled}>Add new species</Button>
                    </Form>
                    {(this.state.formSuccess) ? (
                        < Alert color="success">Plant successfully added!</Alert>
                    ) : (<div></div>)}
                    <br/>
                    
                    <Button onClick={() => this.props.handleBack()}>Back</Button>
                </ModalBody>

            </Modal >


        )
    }
}
export default AddPlantModal;