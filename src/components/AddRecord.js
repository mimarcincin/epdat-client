import React, { Component } from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, Alert } from "reactstrap";
import SelectSearch from 'react-select-search';
import "./styles/Search.css";
import Axios from "axios";
import "../App.css"

class AddRecord extends Component {
    state = {
        endopolyploidy: "",
        ploidyLevel: "",
        number: "",
        indexType: "",
        tissue: "",
        chromosomeNumber: "",
        plant: {},
        submitDisabled: true,
        formSuccess: false,
    }
    constructor() {
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeYesNoHandler = this.changeYesNoHandler.bind(this);
    }
    componentDidMount() {
        this.setState({ plant: this.props.plant })
    }
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value , formSuccess : false})
        if (this.state.endopolyploidy !== "" && this.state.tissue !== "") { this.setState({ submitDisabled: false }) } else { this.setState({ submitDisabled: true }) }
    }
    submitHandler(event){
       
        let record = {
            "endopolyploidy": this.state.endopolyploidy,
            "ploidyLevel": this.state.ploidyLevel,
            "number": this.state.number,
            "indexType": this.state.indexType,
            "tissue": this.state.tissue,
            "chromosomeNumber": this.state.chromosomeNumber,
        }
        Axios.post("https://s.ics.upjs.sk/mmarcincin_api/api/plants/"+this.state.plant.id+"/records", record).then(res => console.log(res));
        this.setState({
            formSuccess : true,
            endopolyploidy: "",
            ploidyLevel: "",
            number: "",
            indexType: "",
            tissue: "",
            chromosomeNumber: "",
            submitDisabled: true,
        })


    }
    changeYesNoHandler(ep){
        this.setState({endopolyploidy: ep , formSuccess : false})
    }
    render() {
        return (
            <div class="divClassic">
                
                            <Modal isOpen={true}>
                                <ModalHeader>
                               <h4> Add new record to {this.state.plant.genus} {this.state.plant.species}</h4>
                                    
                                </ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.submitHandler} id="addRecordForm">
                                        <label>
                                            <br />
                                            
                            Endopolyploidy (yes/no): <SelectSearch search={true} options={[{ name: "yes", value: "1" }, { name: "no", value: "0" }]} name="yesNo" placeholder="yes or no" onChange={this.changeYesNoHandler} />
                                            
                            Ploidy Level:
                            <br />
                            <input id="ploidyInput" type="number" name="ploidyLevel" onChange={this.changeHandler} value ={this.state.ploidyLevel}/>
                                            <br />
                            Number:
                            <br />
                            <input id="numberInput" type="number" name="number" onChange={this.changeHandler} value = {this.state.number}/>
                                            <br />
                            Index Type:
                            <br />
                            <input id="indexInput" type="text" name="indexType" onChange={this.changeHandler} value = {this.state.indexType}/>
                                            <br />
                            Tissue:
                            <br />
                            <input id="tissueInput" type="text" name="tissue" onChange={this.changeHandler} value = {this.state.tissue}/>
                                            <br />
                            Chromosome number:
                            <br />
                            
                            <input id="chromosomeInput" type="text" name="chromosomeNumber" onChange={this.changeHandler} value = {this.state.chromosomeNumber}/> 
                                        </label>
                                        <br />
                                        <Button id="buttonImportant" onClick={() => { this.submitHandler() }} disabled={this.state.submitDisabled}>Add record</Button>
                                       {/* <input type="submit" value="Add Record" disabled={this.state.submitDisabled} />*/}
                                       <br/>
                                        <Button onClick={() => {this.props.handleBack(); this.props.reload()}}>Back</Button>
                                    </Form>
                                    {(this.state.formSuccess) ? (
                                        < Alert color="success">Record successfully added!</Alert>
                                    ) : (<div></div>)}
                                </ModalBody>

                            </Modal >
                   
            </div>
        )
    }
}
export default AddRecord;