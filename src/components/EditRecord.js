import React, { Component } from "react";
import { Table, Button, ModalBody, Modal, ModalHeader, Alert, Form } from "reactstrap";
import Axios from 'axios';
import RecordInfo from "./RecordInfo";
import families from "./data/familyObjects.json";
import SelectSearch from 'react-select-search';
import AddRecord from "./AddRecord";
import "../App.css"

class EditRecord extends Component {
    state = {
        endopolyploidy: "",
        ploidyLevel: "",
        number: "",
        indexType: "",
        tissue: "",
        chromosomeNumber: "",
        source: "",
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
        this.setState({
            endopolyploidy: this.props.record.endopolyploidy,
            ploidyLevel: this.props.record.ploidyLevel,
            number: this.props.record.number,
            indexType: this.props.record.indexType,
            tissue: this.props.record.tissue,
            chromosomeNumber: this.props.record.chromosomeNumber,
            source: this.props.record.source,
            plant: this.props.plant
        })
    }
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value, formSuccess: false })
        console.log(this.state[name]);
        if (this.state.endopolyploidy !== "" || this.state.tissue !== "" || this.state.ploidyLevel !== "" || this.state.indexType !== ""
            || this.state.number !== "" || this.state.chromosomeNumber !== "" || this.state.source !== ""
        ) { this.setState({ submitDisabled: false }) } else { this.setState({ submitDisabled: true }) }
    }

    submitHandler(event) {
        event.preventDefault();
        let rec = {
            "endopolyploidy": this.state.endopolyploidy,
            "ploidyLevel": this.state.ploidyLevel,
            "number": this.state.number,
            "indexType": this.state.indexType,
            "tissue": this.state.tissue,
            "chromosomeNumber": this.state.chromosomeNumber,
            "source": this.state.source,
        }
        Axios.put(global.url + this.props.plant.id + "/records/" + this.props.record.id, rec,{headers: { Authorization: "Bearer " + global.token }}).then(
            res => this.props.update(res.data));
        this.setState({
            formSuccess: false,
            endopolyploidy: "",
            ploidyLevel: "",
            number: "",
            indexType: "",
            tissue: "",
            chromosomeNumber: "",
            source: "",
            submitDisabled: true,

        })


    }
    changeYesNoHandler(ep) {
        this.setState({ endopolyploidy: ep, formSuccess: false })
    }

    render() {
        return (
            <div>
                <ModalHeader>
                    <h4>Update this record</h4>
                </ModalHeader>
                

                <Form onSubmit={this.submitHandler} id="updateRecordForm">
                    <label>
                        <br />
                        <br />
                            Endopolyploidy (yes/no): <SelectSearch search={true} options={[{ name: "yes", value: "1" }, { name: "no", value: "0" }]} name="yesNo" placeholder="yes or no" onChange={this.changeYesNoHandler} />
                        <br />
                            Ploidy Level:
                            <br />
                        <input id="ploidyInput" type="number"  name="ploidyLevel" onChange={this.changeHandler}
                            placeholder={this.state.ploidyLevel} />
                        <br />
                            Number:
                            <br />
                        <input id="numberInput" type="number" step="0.01" name="number" onChange={this.changeHandler}
                            placeholder={this.state.number} />
                        <br />
                            Index Type:
                            <br />
                        <input id="indexInput" type="text" name="indexType" onChange={this.changeHandler}
                            placeholder={this.state.indexType} />
                        <br />
                            Tissue:
                            <br />
                        <input id="tissueInput" type="text" name="tissue" onChange={this.changeHandler}
                            placeholder={this.state.tissue} />
                        <br />
                            Chromosome number:
                            <br />
                            
                        <input id="chromosomeInput" type="text" name="chromosomeNumber" onChange={this.changeHandler}
                            placeholder={this.state.chromosomeNumber} />
                         <br />
                         
                            Source:
                            <br />
                        <input id="sourceInput" type="text" name="source" onChange={this.changeHandler} placeholder = {this.state.source}/> 
                    </label>
                    <Button id="buttonImportant" type="submit" disabled={this.state.submitDisabled}>Update record</Button>

                    {/*<input type="submit" value="Update Record" disabled={this.state.submitDisabled} />*/}
                    <br />
                    <br />
                   
                </Form>
                {(this.state.formSuccess) ? (
                    < Alert color="success">Record successfully updated!</Alert>
                ) : (<div></div>)}


            </div>
        )
    }
}
export default EditRecord;