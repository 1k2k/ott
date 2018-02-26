import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import imagine from "assets/img/sidebar-4.jpg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ObjectList} from 'variables/constants.jsx';
import Item from '../Item/Item.jsx';
import moment from 'moment';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchObjectList: ObjectList,
      startDate: moment()
    };

  }

  componentDidMount() {
    this.setState({searchObjectList: ObjectList});
  }

  handleChange = (e) => {
    this.setState({searchText: e.target.value});
    var rows = [];
    ObjectList.forEach((obj)=>{
      if(obj.name.indexOf(e.target.value)===-1) return;
      rows.push(obj);
    })
    this.setState({searchObjectList: rows});
    this.props.onSearch(rows);
  }

  changeDate = (date) => {

    if(date===null) {
      this.setState({searchObjectList: ObjectList});
      this.props.onSearch(ObjectList);
      return;
    }

    this.setState({
      startDate: date
    });

    var rows = [];
    ObjectList.forEach((obj)=>{
      if(moment(obj.date).date()!== moment(date).date() || moment(obj.date).month()!== moment(date).month()) return;
      rows.push(obj);
    })
    this.setState({searchObjectList: rows});
    this.props.onSearch(rows);

  }

 
  
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };

    const formControl = {
      width: 100
    }

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a href="#" className="simple-text logo-normal">
            Event Google Map
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {
              <div >
                  <div style = {{ padding: 8}}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={this.props.filterText}
                      onChange={this.handleChange}
                      style = {{color: 'black'}}
                      className = "form-control"
                    />
                  </div>
                  <div style = {{ paddingLeft: 8, paddingTop: 3}}>
                   <DatePicker
                      minDate={moment().startOf('year')}
                      maxDate={moment().endOf('year')}
                      selected={this.state.startDate}
                      fixedHeight={false}
                      isClearable={true}
                      onChange={this.changeDate}
                      placeholderText="Click to select a date"
                      className="form-control"
                      
                  >
                  </DatePicker>
                  </div>
                  <div style = {{ marginLeft: 0, paddingTop: 10}}>
                  {
                    this.state.searchObjectList.map((i, index) => {
                      return(
                        <div style={{marginLeft: 0}}>
                          <Item key = {index} item = {i} />
                        </div>
                      )  
                    })
                  }
                  </div>
              </div>
            }
          </ul>
        </div>
      </div>
    );
  }
}



export default Sidebar;
