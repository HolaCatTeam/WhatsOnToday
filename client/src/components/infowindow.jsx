import React, {Component} from 'react';
import { Marker, InfoWindow } from "react-google-maps";

var redMarker = {
          path: 'M142.127,16.659C129.617,1.652,104.592-2.011,86.42,0.941c-70.037,11.38-63.438,113.236-22.494,160.993   c7.631,12.207,19.071,22.95,32.662,24.967c0.043,0.016,0.083,0.036,0.126,0.053c0.003-0.01,0.005-0.019,0.008-0.028   c0.205,0.029,0.404,0.086,0.611,0.111c0.971,0.12,1.591-0.303,1.921-0.922c0.44-0.264,0.856-0.604,1.199-1.108   c9.482-13.987,18.654-29.016,26.688-44.693c0.373-0.288,0.708-0.645,0.951-1.138c3.212-6.545,6.357-13.243,8.99-20.104   c7.141-16.919,12.62-34.375,15.401-51.963C155.274,49.47,153.935,30.822,142.127,16.659z M76.293,69.798   c-5.238-14.597,2.862-29.088,15.227-36.279c0.979,1.375,2.81,2.21,4.455,1.133c15.331-10.036,25.36,8.672,25.838,25.672   c-0.052,1.531-0.082,3.063-0.113,4.594c-0.463,5.829-2.171,11.096-5.328,14.436C104.833,91.559,81.541,84.424,76.293,69.798z',
          fillColor: 'red',
          fillOpacity: 0.8,
          scale: .2,
          strokeColor: 'black',
          strokeWeight: .30
        };


class InfoWindowMarker extends Component {

constructor(props){

	super(props);
	this.state = {
		isOpen: false,
		marker: [],
    eventId:''
	}

this.handleToggleOpen = this.handleToggleOpen.bind(this);
this.handleToggleClose = this.handleToggleClose.bind(this);
this.idFinder= this.idFinder.bind(this);

}

componentWillReceiveProps(nextProps){
 if(nextProps.eventId !== this.props.eventId){
   this.setState({eventId:nextProps.eventId}, () =>{
     this.idFinder();
   });
 }
}

handleToggleClose() {
	this.setState({
		isOpen: this.state.isOpen
	});
}

handleToggleOpen(isOpen) {
	this.setState({
		isOpen: !this.state.isOpen
	});
}

idFinder(){
    if(this.state.eventId === this.props.id){
      this.handleToggleOpen();
    }
}

render() {

return (

		<Marker
      id={this.props.id}
			position={{lat: this.props.position.lat, lng: this.props.position.lng }}
			title={this.props.title}
			name={this.props.name}
			icon={redMarker}
      animation= {google.maps.Animation.DROP}
			onMouseOver={() => this.handleToggleOpen()}>

			{this.state.isOpen &&
					<InfoWindow onMouseOut={() => this.handleToggleClose()}>
						<div className='markerWindow'>
							<div id="content">
								<h5 id="firstHeading" className="firstHeading">{this.props.title}</h5>
								<div id="bodyContent">
									<p className="summary">{this.props.description}</p>
								</div>
							</div>
						</div>
					</InfoWindow>}

		</Marker>

	)
}
}

export default InfoWindowMarker;
