import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class Charts extends React.Component {
    constructor(props){
        super(props);
  this.state = {
      currencies: [],
      chartCurrency: 0,
    dataLine: {
      labels: [],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        },
      ]
    }
  };
}
  getCurrencyFromApi = async (data,filledArrayWithCurrency) => {
    const response = await fetch(`http://data.fixer.io/api/${data}?access_key=838b6140d1075b2d6b49abad2db20d43`)
    
    const json = await response.json();
      this.setState({ 
          currencies: json.rates, 
      })
    
      Object.keys(this.state.currencies).map((name) => this.props.nameOfCurrency === name ? this.setState({ chartCurrency: this.state.currencies[name] }) : {name} )
      filledArrayWithCurrency.push(this.state.chartCurrency)
      console.log(filledArrayWithCurrency)
    }
  
   setInitialLabelArray = async () => {
    var today  = new Date()
    var filledArray = [];
    var filledArrayWithCurrency = [];

    let todayDate = today
    todayDate = todayDate.toISOString().slice(0,10);
    todayDate = today.setDate(today.getDate()-10);

    console.log(today)
    for(let i=0; i<=10; i++)
    { 

      let dateFill = today
      console.log(dateFill)
      dateFill = dateFill.toISOString().slice(0,10);
      filledArray[i] = dateFill;
      dateFill = today.setDate(today.getDate()+1);
      
      let data = filledArray[i]
  }
  for await (let data of filledArray) {
    await this.getCurrencyFromApi(data,filledArrayWithCurrency);
  }
  this.setState({
          dataLine: {
            labels: filledArray,
      datasets: [
        {
          label: this.props.nameOfCurrency,
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: filledArrayWithCurrency
        }
      ]
    }
  });
}

  render() {
    
    return (
      <MDBContainer>
        <h3 className="mt-5">Line chart</h3>
        <button className="btn btn-primary" onClick={this.setInitialLabelArray}></button>
        <button className="btn btn-warning" onClick={this.getMoreCurrenciesFromApi}></button>
        <Line data={this.state.dataLine} options={{ responsive: true }}></Line>
      </MDBContainer>
    );
  }
}

export default Charts;