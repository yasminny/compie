import React from 'react';
let math = require('mathjs');

export default class results extends React.Component {
  constructor() {
    super();
    this.createShopList =this.createShopList.bind(this);
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      math.sin(dLat/2) * math.sin(dLat/2) +
      math.cos(this.deg2rad(lat1)) * math.cos(this.deg2rad(lat2)) *
      math.sin(dLon/2) * math.sin(dLon/2)
    ;
    let c = 2 * math.atan2(Math.sqrt(a), math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (math.PI/180)
  }

  createShopList(latLng){
    const data = {
      "Mega": {
        "branch1": {
          "Latitude": "-48.18562", "Longitude": "46.22114"
        },
        "branch2": {
          "Latitude": "-58.18562", "Longitude": "47.22114"
        },
        "branch3": {"Latitude": "-68.18562", "Longitude": "48.22114"},
        "branch4": {"Latitude": "-78.18562", "Longitude": "49.22114"}
      },
      "Rami": {
        "branch1": {
          "Latitude": "-18.18562", "Longitude": "46.22114"
        },
        "branch2": {"Latitude": "-28.18562", "Longitude": "47.22114"},
        "branch3": {"Latitude": "-38.18562", "Longitude": "48.22114"},
        "branch4": {
          "Latitude": "-25.18562", "Longitude": "49.22114"
        }
      },
      "Shufersal": {
        "branch1": {"Latitude": "-15.18562", "Longitude": "46.22114"},
        "branch2": {"Latitude": "-25.18562", "Longitude": "47.22114"},
        "branch3": {
          "Latitude": "-35.18562", "Longitude": "48.22114"
        },
        "branch4": {
          "Latitude": "-45.18562", "Longitude": "49.22114"
        }
      },
      "Metro": {
        "branch1": {"Latitude": "-12.18562", "Longitude": "46.22114"},
        "branch2": {
          "Latitude": "-22.18562", "Longitude": "47.22114"
        },
        "branch3": {
          "Latitude": "-33.18562", "Longitude": "48.22114"
        },
        "branch4": {
          "Latitude": "-43.18562", "Longitude": "49.22114"
        }
      }
    };
    const arr = latLng.split('+');
    const lat = arr[0];
    const lng = arr[1];
    let branches = [];
    for(const key in data){
      console.log(key+": "+data[key]);
      for(var branch in data[key]) {
        branches.push( {
          branch: branch,
          network: key,
          distance: this.getDistanceFromLatLonInKm(lat, lng, data[key][branch].Latitude, data[key][branch].Longitude)
        });
      }
    }
    console.log(branches);

    return branches.map((item, index)=>{
      return <div key={index}>{ item.network} : { item.branch } distance: { item.distance } in km</div>
    })
  }

  render() {
    const latLng = this.props.match.params.myLocation.toString();
    return (<div className="results-comp">
        <h1>relevant shops:</h1>
        { this.createShopList(latLng) }
      </div>
    );
  }
}
