import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class DataCategoryDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {

    var categoryChoices = Object.keys(this.props.dataToGraph[0]);

    var chartOptions = [];

    for (var i=0; i<categoryChoices.length; i++){
      chartOptions.push({value:categoryChoices[i], label:categoryChoices[i]});
    }


    return (
      <div className="category-selector">
          <h2 className="heading"> Which category would you like to graph?</h2>
          <Select
            name="Category"
            value={this.props.category}
            placeholder="category..."
            options={chartOptions}
            onChange={val => this.props.onCategorySelect(val.value)}
            />
      </div>
    )

  }
}

export default DataCategoryDropdown;
