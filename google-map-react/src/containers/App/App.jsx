import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import {style} from "variables/Variables.jsx";
import appRoutes from 'routes/app.jsx';
import Maps from 'views/Maps/Maps';
import {ObjectList} from "variables/constants.jsx";
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            ObjectList: ObjectList
        }
    }

    render() {
        return (

                <div className="wrapper">
                    
                    <Sidebar onSearch={data => {this.setState({ ObjectList: data })}} />

                    <div id="main-panel" className="main-panel">
                        
                        <Maps data={this.state.ObjectList} />
                    </div>
                </div>
        );
    }
}

 export default App;
