import React, { Component } from "react";
import { Button, Modal, ModalBody, Alert } from "reactstrap";
import axios from 'axios';
import EditRecord from './EditRecord';
import "../App.css";

class RecordInfo extends Component {
    state = {
        record: {},
        plant: {},
        isDeleted: false,
        isDeleteRecord: false,
        isUpdateRecord: false,
    }
    constructor() {
        super();
        this.handleBackToRecord = this.handleBackToRecord.bind(this);
        this.setRecord = this.setRecord.bind(this);
    }
    handleDelete() {
        console.log("deleting record");
        axios.delete("https://s.ics.upjs.sk/mmarcincin_api/api/plants/" + this.state.plant.id + "/records/" + this.state.record.id).then(res => console.log(res));
        this.setState({ isDeleted: true });
        this.props.delFromList(this.state.plant.id);
    }
    setRecord(updatedRecord) {
        console.log(updatedRecord);


        this.setState({
            record: updatedRecord
        })

    }

    componentDidMount() {
        this.setState({ plant: this.props.plant, record: this.props.record });
        console.log("Plant from RecordInfo: " + this.state.plant.id);
        console.log("Record from RecordInfo: " + this.state.record.id);
    }
    handleBackToRecord() {
        this.setState({ isUpdateRecord: false })
    }
    render() {

        return (
            <div>
                <h3>Record of the {this.state.plant.genus+" "+this.state.plant.species}</h3>

                <h6>{"ID of record: "+this.state.record.id}</h6>
                <h6>{"Endopolyploidy: " +this.state.record.endopolyploidy}</h6>
                <h6>{"Ploidy level: "+this.state.record.ploidyLevel}</h6>
                <h6>{"Index number: "+this.state.record.number}</h6>
                <h6>{"Index type: "+this.state.record.indexType}</h6>
                <h6>{"Tissue: "+this.state.record.tissue}</h6>
                <h6>{"Chromosome number: "+this.state.record.chromosomeNumber}</h6>
                <h6>{"Created at: "+this.state.record.createdAt}</h6>
                <h6>{"Updated at: "+this.state.record.updatedAt}</h6>
                <br />


                <Button onClick={() => this.setState({ isDeleteRecord: true })}>Delete</Button>
                <Button onClick={() => this.setState({ isUpdateRecord: true })}>Edit</Button>
                <br />
                <hr />
                <Button onClick={() => { this.props.handleBack(); this.props.reload() }}>Back</Button>
                <Modal isOpen={this.state.isDeleteRecord}>
                    <ModalBody>
                        {(this.state.isDeleted) ? (
                            <div >
                                <Alert color="success">Record successfully deleted!</Alert>
                                <Button onClick={() => { this.setState({ isDeleteRecord: false }); this.props.handleBack(); this.props.reload(); }}>Back</Button>
                            </div>
                        ) : (
                                <div class="divClassicDelete">
                                    Do you really want to delete this record ?
                                    <br/>
                                    <Button onClick={() => this.handleDelete()}>Yes, delete</Button>
                                    <Button id="buttonDelete" onClick={() => this.setState({ isDeleteRecord: false })}>No</Button>
                                </div>
                            )}
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isUpdateRecord}>
                    <ModalBody>
                        <EditRecord plant={this.state.plant} record={this.state.record} handleBack={() => this.handleBackToRecord()}
                            update={(rec) => this.setRecord(rec)} />
                        <Button onClick={() => this.setState({ isUpdateRecord: false })}>Back</Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default RecordInfo;