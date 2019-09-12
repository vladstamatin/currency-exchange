import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import DropdownList from './dropdown.jsx'
import Charts from './chart';
// simple currency converter using an Api 

class Converter extends React.Component {
constructor(){
    super();
    this.state = {
        result: 0.0000,
        convertFrom: null,
        convertFromName: 'USD',
        convertTo: null,
        amount: 1,
        currencies: [],
        check: false,
        datefix: 'latest',
        checkIp: null
      };
      this.handleSelectFrom = this.handleSelectFrom.bind();
}
    componentDidMount() {
        this.newDate()
        console.log(this.state.datefix)
        fetch(`http://data.fixer.io/api/${this.state.datefix}?access_key=6771539900770fdac8abae8d533455cd&format=1`)
        .then(response => response.json())
        .then((json) =>
      {
        console.log(json);
        this.setState({ 
            currencies: json.rates, 
        })
      }) 
    }

    handleSelectFrom = (e) => {
        this.setState({
            convertFrom: e.target.value,
        })
        Object.keys(this.state.currencies).map((name, key) => e.target.value == this.state.currencies[name] ? (this.setState({
            convertFromName: name
        })) :  this.state.currencies
        )
        console.log(this.state.convertFrom) 
    }

    handleSelectTo = (e) => {
        this.setState({
            convertTo: e.target.value,
        })
        Object.keys(this.state.currencies).map((name, key) => e.target.value == this.state.currencies[name] ? (this.setState({
            convertToName: name
        })) :  this.state.currencies
        )
        console.log(this.state.convertTo) 
    }

    convertValues = (resultOfConvert) => {
        resultOfConvert = ((this.state.amount)/(this.state.convertFrom)) * (this.state.convertTo)
            this.setState({
                result: resultOfConvert
            });
    }

    newDate = () => {
        var today  = new Date();
        today = today.toISOString().slice(0,10);
            this.setState({
                datefix: today
            })
    }

    handleAmountInput = (e) => {
        this.setState({
            amount: e.target.value
        });
    }

    render() { 
        return ( 
            <div className="Converter">
                <h2>Currency exchanges</h2>
                    <div className="inputSection">
                        <div><input className="btn btn-light" defaultValue={this.state.amount} onChange={this.handleAmountInput}></input></div>
                            <DropdownList 
                                onChangeFrom={this.handleSelectFrom}
                                onChangeTo={this.handleSelectTo}
                                getcurrency={this.state.currencies}
                                />
                            <button className="btn btn-light"  onClick={this.convertValues}>Convert</button>
                    </div>
                <div className="resultSection">    
                    <h3>{this.state.amount} {this.state.convertFromName} is equal {(this.state.result).toFixed(4)} {this.state.convertToName}</h3>
                </div>
                    <Charts 
                    convertFromChart={this.state.convertFrom}
                    nameOfCurrency={this.state.convertToName}/>
            </div> 
                );
            }
}
export default Converter;