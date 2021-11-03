import React from "react";
import axios from 'axios';
import {Table,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Summary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            weekSummary:[],
            showSummary:[]
        }
    }
    
    componentDidMount(){
        axios
            .get('http://localhost:8080/summary')
            .then((response) => {
             //   console.log(response);
                this.setState({weekSummary:response.data, showSummary:response.data.slice(0,1)});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleViewAndEdit(index){
        console.log('summary index: ', index);
        this.props.history.push('/timeSheet');
    }

    handleShowMore = () =>{
        this.setState({showSummary : this.state.weekSummary});
    }

    handleShowLess = () =>{
        this.setState({showSummary : this.state.weekSummary.slice(0,1)});
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>WeekEnding</th>
                            <th>Total Hours</th>
                            <th>Submission Status</th>
                            <th>Approval Status</th>
                            <th>Option</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.showSummary.map((summ, index)=>{ 
                            return (
                            <tr key={index}>
                                <td>{summ.weekEnding}</td>
                                <td>{summ.totalHours}</td>
                                <td>{summ.submissionStatus}</td>
                                <td>{summ.approvalStatus}</td>
                                <td>
                                    {summ.approvalStatus === 'Approved' ? 
                                        (<Button variant="outline-secondary" onClick={() => this.handleViewAndEdit(index)}>View</Button>) : 
                                        (<Button variant="outline-secondary" onClick={() => this.handleViewAndEdit(index)}>Edit</Button>)}
                                </td>
                                <td>{summ.comment}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Button variant="outline-secondary" onClick={this.handleShowMore}>Show More</Button>
                <Button variant="outline-secondary" onClick={this.handleShowLess}>Show Less</Button>
            </div>
        )
    }
}

export default Summary;