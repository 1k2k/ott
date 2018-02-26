import React, { Component } from 'react';

import image0 from 'assets/img/faces/face-1.jpg'

import {Grid, Row, Col, Container} from 'react-bootstrap'
export class Item extends Component{

    constructor(props){
        super(props);
        
    }

    componentDidMount() {

    }

    render(){
        return (
            <div className = "row" style = {{backgroundColor: 'white', marginRight: 8, marginLeft: 8, marginBottom: 5}}>
                <div className = "col-md-12 col-xs-12" >
                    <div className = "row" >
                        <div className = "col-md-4 col-xs-6" style = {{ paddingLeft: 0, }}>
                            <img src = {image0} style = {{width: 100, height: 100}} ></img>  
                        </div>
                        <div className = "col-md-8" >
                            <div className = "row">
                                <div className = "col-xs-12" style={{fontWeight: 'bold', paddingTop: 5,  fontSize: 12, color: '#95a5a6'}}>
                                    {this.props.item.date.toString()}
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col-xs-12" style={{fontWeight: 'bold',  color: '#2c3e50'}}>
                                    {this.props.item.name.toString()}
                                </div>
                            </div>
                            <div className = "row">
                                <div className = "col-xs-12" style={{fontWeight: 'bold', paddingTop: 5,  color: '#95a5a6', fontSize: 12}}>
                                    {this.props.item.subtitle}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "row" style = {{height: 1, backgroundColor: '#2c3e50'}}></div>
                    <div className = "row" style={{height: 30}}>
                        <div className = "col-md-4 " style = {{paddingTop: 5, color: "#95a5a6"}}>
                            #FoodDrink
                        </div>
                        <div className = "col-md-4" style = {{paddingTop: 5, color: "#95a5a6"}}>
                            #Gala
                        </div>
                        <div className = "col-md-4"  style={{paddingLeft: 0, paddingRight: 0}}>
                            <i className = "pe-7s-upload text-right pull-right" style={{position: 'absolute', right: 35, color: '#95a5a6'}} ></i>
                            <i className = "pe-7s-ribbon text-right pull-right" style={{position: 'absolute', right: 0, color: '#95a5a6'}} ></i>
                        </div>
                    </div>

                </div>

           </div>

        );
    }
}

export default Item;
