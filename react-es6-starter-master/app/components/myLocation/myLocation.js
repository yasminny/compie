import React from 'react';
import './myLocation.scss';

export default class myLocation extends React.Component {
  constructor() {
    super();
    this.handelGoTo = this.handelGoTo.bind(this);
    this.initMap = this.initMap.bind(this);
    this.forMap = this.forMap.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    let map = new google.maps.Map(this.map, {
      center: {lat: 32.07762926680949, lng: 34.79069709777832},
      zoom: 13
    });

    let input = this.input;
    let card = this.pacCardDiv;
    let autocomplete = new google.maps.places.Autocomplete(input);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    autocomplete.bindTo('bounds', map);

    let infowindow = new google.maps.InfoWindow();
    let infowindowContent = this.infoWindowContent;
    infowindow.setContent(infowindowContent);
    let marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', ()=> this.forMap(infowindow, marker, autocomplete, map) );
    console.log(latLng);
  }

  forMap(infowindow, marker, autocomplete, map){
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      this.latLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    }

  handelGoTo() {
    const origin = this.input.value;
    console.log(this.latLng);
    this.props.history.push(`/results/${ this.latLng.lat }+${ this.latLng.lng }`);

  }

  render() {
    return (<div className="my-location-comp">
      <h1>המיקום שלי :</h1>
        <div className="map" ref={(ref) => this.map = ref}/>
      <div className="pac-card" ref={(ref) => this.pacCardDiv = ref}>
        <div className="pac-container">
          <input className="pac-input" type="text" ref={(ref) => this.input = ref}
                 placeholder="Enter a location"/>
        </div>

        <div className="infowindow-content" ref={(ref) => this.infoWindowContent = ref}>
          <img src="" width="16" height="16" className="place-icon" ref={(ref) => this.placeIcon = ref}/>
            <span className="title place-name" ref={(ref) => this.placeName = ref}/><br/>
            <span className="place-address" ref={(ref) => this.placeAddress = ref}/>
        </div>
      </div>
      <button type="button" onClick={ this.handelGoTo }>שלח</button>
    </div>
  );
  }
  }
