import React, { Component } from "react";

class DropdownList extends Component {
    constructor(props){
        super(props);
        this.state = {
          };
    }
    render() { 
        return ( 
            <div>
                <select className="btn btn-light px-md-5" onChange={this.props.onChangeFrom}>
                    <option>Please select</option>
                    {Object.keys(this.props.getcurrency).map((name, key) => <option key={key} value={this.props.getcurrency[name]}>{name}</option>) }
                </select>
                <select className="btn btn-light px-md-5"  onChange={this.props.onChangeTo}>
                    <option>Please select</option>
                    {Object.keys(this.props.getcurrency).map((id, key) => <option key={key} value={this.props.getcurrency[id]}>{id}</option>) }
                </select>
            </div>
         );
    }
}
 
export default DropdownList;