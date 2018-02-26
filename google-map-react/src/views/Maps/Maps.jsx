import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import { ObjectList } from 'variables/constants.jsx';

import ItemMobile from '../../components/Item/Item-mobile.jsx';
import Button from '../../components/CustomButton/CustomButton.jsx';
import ReactResizeDetector from 'react-resize-detector';
import Autosuggest from 'react-autosuggest';
import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import image0 from 'assets/img/faces/face-1.jpg';

import  './suggest.css';

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('\\b' + escapedValue, 'i');
    
    return ObjectList.filter(person => regex.test(getSuggestionValue(person)));
  }
  
  function getSuggestionValue(suggestion) {
    return `${suggestion.name}`;
  }
  
  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
  
    return (
  
    <span>
        { 
            <span className={'suggestion-content ' }><img src={image0} style={{width: 40, hegith: 40}} />   
            <span className="name">
            {parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
                return (
                  <span className={className} key={index}>{part.text}</span>
                );
            })}
            </span>
            </span>    
        }
    </span>
    );
  }


  class CustomInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: ''}
        
    }

    componentWillReceiveProps(nextProps) {
        nextProps.value===''? this.setState({date: moment(new Date()).format('DD/MM/YYYY')}):  this.setState({date: nextProps.value})
    }

    render () {
        
      return (
        <Button
            fill
            bsStyle="info"
            style = {{width: 250}}
          onClick={this.props.onClick}>
          {this.state.date}
        </Button>
      )
    }
  }
  


class Maps extends Component{

    constructor(props) {
        super(props) 
        this.state={    showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            object: 0,
            searchText:'',
            searchObjectList:[],
            flag: true,
            value: '',
            suggestions: []
        }
        
    }

    onChangeSuggest = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });

        var rows = [];
        ObjectList.forEach((obj)=>{
          if(obj.name.indexOf(newValue)===-1) return;
          rows.push(obj);
        })
        this.setState({searchObjectList: rows});

      };
    
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };
    
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };


    onMarkerClick = (index, props, marker, e) => {
        console.log(index)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          object: index
        });
      }

      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      }

      changeDate = (date) => {
        if(date===null) {
          this.setState({searchObjectList: ObjectList});
          this.setState({value: ''});
          this.setState({startDate: ''})
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
    
      }

      componentWillReceiveProps(nextProps){
          this.setState({searchObjectList: nextProps.data})
      }

      componentDidMount(e){
        if(window.innerWidth < 993){
            this.setState({flag: false});
        } else {
            this.setState({flag: true});
        }
    }


    _onResize = () => {
        if(window.innerWidth < 993){
            this.setState({flag: false});
        } else {
            this.setState({flag: true});
        }
      }


    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
        placeholder: "Search...",
        value,
        onChange: this.onChangeSuggest
        };
        return (
            <div id="map">
                <ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
                <Map google={this.props.google}
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    className={'map'}
                    initialCenter={{
                        lat: 45.444424, lng: -75.722101
                      }}
                    zoom={8}
                    onClick={this.onMapClicked}
                    >


                    {this.state.flag===false? 
                    <div style={{width: '350', position: 'absolute', left: (window.innerWidth / 2) - 125, top: 100}}>

                            <Autosuggest 
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps} />

                            <DatePicker
                            customInput={<CustomInput />}
                            minDate={moment().startOf('year')}
                            maxDate={moment().endOf('year')}
                            selected={this.state.startDate}
                            fixedHeight={false}
                            isClearable={false}
                            onChange={this.changeDate}
                            placeholderText="Click to select a date"
                            className="form-control"
                            />

                        
                    </div>
                   : null}


                    {
                        this.state.searchObjectList.map((item, i)=>{
                        return (
                            <Marker
                                key={i}
                                title={item.subtitle}
                                name={item.name}
                                position={{lat: item.places.lat, lng: item.places.lng}}
                                onClick={this.onMarkerClick.bind(this, item.id)}
                                />
                        )
                        })
                    }
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>

                          <ItemMobile item={ObjectList[this.state.object]} />
                    </InfoWindow>

                </Map>
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBoukz4bPVFMNm-vogwIlwLe-tTlv6CTv0"
})(Maps)
// export default Maps;