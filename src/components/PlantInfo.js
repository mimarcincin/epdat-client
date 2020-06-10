import React, { Component } from "react";
import { Table, Button, ModalBody, Modal, ModalHeader, Alert, Form } from "reactstrap";
import axios from 'axios';
import RecordInfo from "./RecordInfo";
import families from "./data/familyObjects.json";
import SelectSearch from 'react-select-search';
import AddRecord from "./AddRecord"
import "../App.css"

class PlantInfo extends Component {
    state = {
        plant: {},
        records: [],
        isRecord: false,
        record: {},
        isDeleteModal: false,
        isUpdateModal: false,
        isDeleted: false,
        isUpdated: false,
        family: "",
        genus: "",
        species: "",
        authority: "",
        notice: "",
        formSuccess: false,
        submitDisabled: true,
        isNewRecord: false,
    }
    constructor() {
        super();
        this.changeFamilyHandler = this.changeFamilyHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    changeFamilyHandler(fam) {
        this.setState({ family: fam });
        if (this.state.family !== "") this.setState({ submitDisabled: false, isUpdated: false })
    }
    changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value, formSuccess: false });
        console.log(this.state[name]);
        if (this.state.family !== "" || this.state.genus !== "" || this.state.species !== ""
            || this.state.authority !== "" || this.state.notice !== "") { this.setState({ submitDisabled: false }) } else {
            this.setState({ submitDisabled: true })
        }
        this.setState({ isUpdated: false })

    }

    submitHandler(event) {
       
        this.handleUpdate();


    }
    handleDelete() {
        console.log("deleting: " + this.state.species);
        axios.delete("https://s.ics.upjs.sk/mmarcincin_api/api/plants/" + this.state.plant.id).then(res => console.log(res));

        this.setState({
            formSuccess: true,
            family: "",
            genus: "",
            species: "",
            authority: "",
            notice: "",
        })
        this.setState({ isDeleted: true });
        this.props.delFromList(this.state.plant.id);
    }
    handleUpdate() {

        let updatingPlant = {
            "family": this.state.family,
            "genus": this.state.genus,
            "species": this.state.species,
            "authority": this.state.authority,
            "notice": this.state.notice,
        }
        console.log("updating: " + updatingPlant);
        axios.put("https://s.ics.upjs.sk/mmarcincin_api/api/plants/" + this.state.plant.id, updatingPlant).then(res => this.setState({
            formSuccess: true,
            family: res.data.family,
            genus: res.data.genus,
            species: res.data.species,
            authority: res.data.authority,
            notice: res.data.notice,
        }));
        let statePlant = this.state.plant;
        if (updatingPlant.family !== "") statePlant.family = updatingPlant.family;
        if (updatingPlant.genus !== "") statePlant.genus = updatingPlant.genus;
        if (updatingPlant.species !== "") statePlant.species = updatingPlant.species;
        if (updatingPlant.authority !== "") statePlant.authority = updatingPlant.authority;
        if (updatingPlant.notice !== "") statePlant.notice = updatingPlant.notice;
        this.setState({ isUpdated: true });
    }
    reloadRecords() {
        axios.get("https://s.ics.upjs.sk/mmarcincin_api/api/plants/" + this.props.plant.id + "/records")
            .then(response => {
                this.setState({
                    records: response.data
                })
            })
    }
    componentDidMount() {
        this.setState({
            isRecord: false, plant: this.props.plant, isDeleteModal: false,
            isUpdateModal: false, isDeleteModal: false,
            family: this.props.plant.family,
            genus: this.props.plant.genus,
            species: this.props.plant.species,
            authority: this.props.plant.authority,
            notice: this.props.plant.notice,
        })
        this.reloadRecords();

    }
    recordClicked(record) {
        this.setState({ isRecord: true, record: record });
    }
    handleBack() {
        this.setState({ isRecord: false, isUpdateModal: false, isDeleteModal: false, isNewRecord: false })
    }
    deleteRecordFromList(record) {
        let recordss = this.state.records.filter; /*???????????????*/
    }
    render() {
        let records = this.state.records.map((record) => {
            return (

                <tr key={record.id} >
                    <td>{record.id}</td>
                    <td>{record.endopolyploidy}</td>
                    <td>{record.chromosomeNumber}</td>
                    <td>{record.ploidyLevel}</td>
                    <td>{record.number}</td>
                    <td>{record.indexType}</td>
                    <td>{record.tissue}</td>
                    { /*   <td>{plant.createdAt}</td>
                    <td>{plant.updatedAt}</td> */ }
                    <td><Button onClick={() => this.recordClicked(record)}>Open</Button></td>
                </tr>


            )

        });

        return (


            <div>
                {this.state.isRecord ? (
                    <RecordInfo plant={this.state.plant} record={this.state.record} handleBack={() => this.handleBack()}
                        delFromList={() => this.deleteRecordFromList()} reload={() => this.reloadRecords()} />
                ) : (

                        <div>
                            <h2> {this.state.plant.genus+ " "+this.state.plant.species}</h2>
                            <h4> {this.state.plant.family}</h4>
                            <h4>{"ID: "+this.state.plant.id}</h4>
                            <Button onClick={() => this.setState({ isDeleteModal: true, isUpdateModal: false })}>Delete</Button>
                            <Button onClick={() => this.setState({ isDeleteModal: false, isUpdateModal: true })}>Edit</Button>
                            <Button onClick={() => this.setState({ isNewRecord: true })}>Add new record</Button>
                            {this.state.isNewRecord ? (
                                <AddRecord handleBack={() => this.handleBack()} plant={this.state.plant} reload={() => this.reloadRecords()} />
                            ) : (<div></div>)}
                            {this.state.isDeleteModal ? (
                                <Modal isOpen={true}>

                                    <ModalBody>
                                        {(this.state.isDeleted) ? (
                                            <div>
                                                <Alert color="success">Plant successfully deleted!</Alert>
                                                <Button onClick={() => {
                                                    this.setState({ isDeleteModal: false });
                                                    this.props.handleBack(); this.props.reload();
                                                }}>Back</Button>
                                            </div>
                                        ) : (
                                                <div class="divClassicDelete">
                                                    Really want to delete {this.state.plant.genus + " " + this.state.plant.species} ?
                                                    <br/>
                                                    <Button onClick={() => this.handleDelete()}>Yes, delete</Button>
                                                    <Button id="buttonDelete" onClick={() => this.setState({ isDeleteModal: false })}>No</Button>
                                                </div>
                                            )}
                                    </ModalBody>
                                </Modal>
                            ) : (<div></div>)}



                            {this.state.isUpdateModal ? (
                                <div>
                                    <Modal isOpen={true}>
                                        <ModalHeader>
                                        <h4>Update {this.state.plant.genus} {this.state.plant.species}</h4>
                                        </ModalHeader>
                            
                            <ModalBody>
                                            <Form onSubmit={this.submitHandler} id="updatePlantForm">
                                                <label>
                                                    
                                                    
                                                    Family: <SelectSearch search={true} options={families} name="family"
                                                        placeholder={this.state.plant.family} onChange={this.changeFamilyHandler} />
                                                    <br />
                                                    Genus:
                                                    <br />
                                                    <input id="genusInput" type="text" name="genus" onChange={this.changeHandler}
                                                        placeholder={this.state.plant.genus} />
                                                    <br />
                                                    Species:
                                                    <br />
                                                    <input id="speciesInput" type="text" name="species" onChange={this.changeHandler}
                                                        placeholder={this.state.plant.species} />
                                                    <br />
                                                    Authority:
                                                    <br />
                                                    <input id="authorityInput" type="text" name="authority" onChange={this.changeHandler}
                                                        placeholder={this.state.plant.authority} />
                                                    <br />
                                                    Notice:
                                                    <br />
                                                    <input id="noticeInput" type="text" name="notice" onChange={this.changeHandler}
                                                        placeholder={this.state.plant.notice} />
                                                </label>
                                                <br />

                                                {/*<input type="submit" value="Update" disabled={this.state.submitDisabled} />*/}
                                                <Button id="buttonImportant" onClick={() => { this.submitHandler() }} disabled={this.state.submitDisabled}>Update species</Button>
                                            </Form>
                                            {this.state.isUpdated ? (
                                                <div>
                                                    <Alert color="success">Plant successfully updated!</Alert>
                                                    <Button onClick={() => {
                                                        this.setState({ isUpdateModal: false });
                                                        this.setState({ isUpdated: false })
                                                    }}>Back</Button>

                                                </div>
                                            ) : (
                                                    <div>
                                                        <Button onClick={() => this.setState({
                                                            isUpdateModal: false,
                                                            formSuccess: false
                                                        })}>Back</Button>
                                                    </div>)}
                                        </ModalBody>
                                    </Modal>
                                </div>
                            ) : (
                            <div>

                            </div>)}



                            <Table>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Endopolyploidy</th>
                                        <th>Chromosome number</th>
                                        <th>Ploidy level</th>
                                        <th>Number</th>
                                        <th>indexType</th>
                                        <th>Tissue</th>
                                        <th/>
                                        {/* <th>Created at</th>
                                        <th>Updated at</th>*/}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records}
                                </tbody>
                            </Table>
                        </div>
                    )
                }
            </div>

        )
    }
}
export default PlantInfo;