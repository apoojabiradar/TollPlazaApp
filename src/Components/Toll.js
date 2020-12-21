import React, { Component } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Radio,
  RadioGroup,
  CssBaseline,
  FormControlLabel,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types'; 
import ReceiptData from './ReceiptData'
import { getReceipt, addReceipt} from '../Redux/action';  
import { connect } from 'react-redux';  



class Toll extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      id: this.generateReceiptNo(),  
      regNo: "",  
      amount : 100,
      date : new Date().toISOString(),
      receiptType: "oneWay",
      receiptNo: "",
      isValidReceipt: false
    };  
  } 

  static propTypes = {  
    receipts: PropTypes.array.isRequired,  
    getReceipt: PropTypes.func.isRequired,  
    addReceipt: PropTypes.func.isRequired,   
  };  

  generateReceiptNo =() => {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  handleAmtChange = (e) => {  
    this.setState({  
      amount: e.target.value === 'oneWay'?  100 : 200,
      receiptType: e.target.value
    });  
  }
 
  handleRegChange = (e) => {  
    this.setState({  
      regNo: e.target.value  
    });  
  }

  handleDateChange = (e) => {
    this.setState({
        date: e.target.value
    })
  }
  
  
  handleReceiptChange = (e) => {
    this.setState({
        receiptNo: e.target.value
    })
  }

  componentDidMount() {  
    this.props.getReceipt();  
  } 

  
  sameDay = (start, end) => {
    return (start.toDateString() === end.toDateString())
  }

  checkReceipt = () => {
    if(this.state.receiptNo && this.state.receiptNo !== 0){
      var foundReceipt = this.props.receipts.filter((item) => item.id == this.state.receiptNo && item.receiptType==="Return");
      if(foundReceipt.length>0){
        var receiptDate = new Date(foundReceipt[0].date);
        var today = new Date();
        if(this.sameDay(receiptDate, today)){
          this.setState({
            isValidReceipt: true
          })
         
        }else{
          this.setState({
            isValidReceipt: false
        })
        }
      }else{
        this.setState({
          isValidReceipt: false
      })
      }
    }
  }
  submitData = () => {  
    if (this.state.regNo && this.state.date && this.state.amount) {  
      const newReceipt = {  
        id: this.state.id,  
        regNo: this.state.regNo,  
        amount: this.state.amount,
        receiptType: this.state.receiptType,
        date: this.state.date
      }; 
      this.props.addReceipt(newReceipt);  
      this.clearData();
      console.log("form submitted", newReceipt);
    }
  }

  clearData = () => {  
    this.setState({  
      id: this.generateReceiptNo(),  
      regNo: "",  
      amount: 100,
      receiptType:"oneWay"
    });  
  }  

  render() {  

    let receiptResponse="";
    if(this.state.receiptNo){
      receiptResponse = this.state.isValidReceipt?
      <Alert severity="success">Valid Receipt</Alert>
      :
      <Alert severity="error">Invalid Receipt</Alert>
    }

  return (

   
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Toll Ticket
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={6}>
    
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
              
              <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    disabled
                    name="receiptNO"
                    type="number"
                    label="Receipt No"
                    value={this.state.id}   
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="Vehical Registration Number"
                    type="number"
                    label="Vehical Registration Number"
                    onChange={this.handleRegChange} 
                    value={this.state.regNo}   
                  />
                </Grid>
                
                <Grid item xs={12}>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                        value="oneWay"
                        control={<Radio color="primary" />}
                        label="One Way"
                        checked={this.state.receiptType==='oneWay'}
                        onChange={this.handleAmtChange}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="Return"
                        control={<Radio color="primary" />}
                        label="Return"
                        checked={this.state.receiptType==='Return'}
                        onChange={this.handleAmtChange}
                        labelPlacement="start"
                    />
                </RadioGroup>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="amount"
                    type="number"
                    label="Amount"
                    disabled
                    value={this.state.amount}   
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="Date"
                    type="text"
                    disabled
                    onChange={this.handleDateChange} 
                    value={this.state.date}   
                  />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={this.reset}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.submitData}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="receiptNo"
                    type="number"
                    label="Receipt No"
                    onChange={this.handleReceiptChange} 
                    value={this.state.receiptNo}   
                  />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={this.checkReceipt}
                  >
                    Search
                  </Button>
                </Grid>

            <Grid item xs={12}>
              {receiptResponse}
            </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

            <br />
            <br />

             <ReceiptData receipts={this.props.receipts} /> 
    </div>
  );
}
}

const mapStateToProps = state => ({  
  receipts: state.receipts  
}); 
export default connect(mapStateToProps, { getReceipt, addReceipt })(Toll); 