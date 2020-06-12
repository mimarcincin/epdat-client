import React, { Component } from "react";
import { Button, ModalBody, Modal, ModalHeader, Alert, Form} from "reactstrap";
import axios from 'axios';
import "../App.css"
import "./styles/Search.css";

class LoginModal extends Component{
    state = {
        loginName: "",
		password: ""
    }
	handleLogin(){
        let login = {
            username: this.state.loginName,
            password: this.state.password
        }
        axios.post(global.urlA + "authenticate", login).then(res => {global.token = res.data.token});
        console.log(global.token);
        this.props.handleBackFromLogin();
	}
    render(){
        return(
            <Modal isOpen={true}>
				<ModalHeader>
				    Login
                    <br/>
				</ModalHeader>
				<ModalBody>
                    <Form onSubmit={()=>this.handleLogin()}>
                    Login name
					<input type="text" onChange={(event) => {this.setState({loginName: event.target.value})}}/>
					<br/>
                    <br/>
                    Password
                    <br/>
					<input type="password" onChange={(event) => {this.setState({password: event.target.value})}}/>
                    <br/>
                    <br/>
					<Button id="buttonImportant" type="submit" >Login</Button> <br/>
					<Button onClick={() => {this.props.handleBackFromLogin()}}>Cancel</Button>
                    <br/>
                    </Form>
				</ModalBody>
			</Modal>
)
}

}
export default LoginModal;