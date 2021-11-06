import React from "react";
import axios from 'axios';
import {Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phone:"",
            email:"",
            address:"",
            em1name:"",
            em1phone:"",
            em2name:"",
            em2phone:"",
            user:localStorage.getItem("user"),
        }
    }

    componentDidMount(){
        if(!localStorage.getItem("token")){
            this.props.history.push("/")
            window.location = '/';
        }
        axios
            .get('http://localhost:9000/profile/'+this.state.user)
            .then((response) => {
                console.log(response);
                this.setState({phone:response.data.phone, email:response.data.email,address:response.data.address});
                this.setState({em1name:response.data.emergencyContacts[0].name});
                this.setState({em1phone:response.data.emergencyContacts[0].phone})
                this.setState({em2name:response.data.emergencyContacts[1].name})
                this.setState({em2phone:response.data.emergencyContacts[1].phone})
            })
            .catch((error) => {
                console.log(error);
            });
            
    }

    handleUpdate = () =>{
        const contact = {
            id:"6184834c257787a6bae94c2c",
            user:this.state.user,
            phone:this.state.phone,
            email:this.state.email,
            address:this.state.address,
            emergencyContacts: [{
                name:this.state.em1name,
                phone:this.state.em1phone
            },{
                name:this.state.em2name,
                phone:this.state.em2phone
            }]
        };
        axios
            .post('http://localhost:9000/profile',contact)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            
    }

    render() {
        return (
            <div className="contact">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder={this.state.phone} onChange={e => this.setState({ phone: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={this.state.address} onChange={e => this.setState({ address: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Emergency Contact 1</Form.Label>
                        <Form.Control type="name1" placeholder="name" placeholder={this.state.em1name} onChange={e => this.setState({ em1name: e.target.value })}/>
                        <Form.Control type="phone1" placeholder="phone" placeholder={this.state.em1phone} onChange={e => this.setState({ em1phone: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Emergency Contact 2</Form.Label>
                        <Form.Control type="name2" placeholder={this.state.em2name} onChange={e => this.setState({ em2name: e.target.value })}/>
                        <Form.Control type="phone2" placeholder={this.state.em2phone} onChange={e => this.setState({ em2phone: e.target.value })}/>
                    </Form.Group>

                </Form>
                <Button variant="outline-secondary" onClick={this.handleUpdate}>Update</Button>
            </div>
        )
    }
}

export default Profile;