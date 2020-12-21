import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Typography, Paper} from '@material-ui/core';

 class ReceiptData extends Component {
    render() {
        return (
             <Paper >
                <div className="card card-body mb-3">
                  <Typography variant="h4" align="center" component="h1" gutterBottom>
                    Toll Receipt
                </Typography>  
                 <ul className="list-group">
                    {this.props.receipts && this.props.receipts.map((data, index) => {  
                    return <div key={(index + 1)}>  
                    <li className="list-group-item">Receipt Number: {(data.id)} </li> 
                    <li className="list-group-item">Registration Number: {data.regNo} </li>
                    <li className="list-group-item">Receipt Type: {data.receiptType}</li>
                    <li className="list-group-item">Amount: {data.amount}</li>
                    <li className="list-group-item">Date: {data.date}</li>
                     </div>
                })}  
               </ul>
               </div>
             </Paper>
        
        )
    }
}
export default ReceiptData 