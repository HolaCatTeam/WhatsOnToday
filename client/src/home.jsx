import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import API_KEY from './api.js';
import Form from './components/form.jsx';
import Events from './components/events.jsx';
import Map from './components/map.jsx';
import $ from 'jquery';
import Contact from './components/Comments.js';
import Navigation from './components/Navigation.js';
import Comments from './components/feedback.jsx';
import Footer from './components/footer.jsx';
import swal from 'sweetalert';

class App extends Component {
 constructor (props){
   super(props);
   this.state = {
     eventList: [],
     lat: null,
     lon: null,
     description:'',
     category: '',
     eventId: ''
   }

   this.getEvent = this.getEvent.bind(this);
   this.getCategory = this.getCategory.bind(this);
   this.addComment = this.addComment.bind(this);
   this.sweetalertfunction = this.sweetalertfunction.bind(this);
   this.openInfoWindow= this.openInfoWindow.bind(this);

 }

 openInfoWindow(id){
   this.setState({
     eventId: id
   })
 }

sweetalertfunction(scr){
  console.log("button clicked")
  swal(scr)
}

 addComment(description) {

   $.ajax({
     url:'/events',
     type: "POST",
     contentType: 'application/json',
     data: JSON.stringify({
       description: description
     }),
     success: (data)=> {
     },
     error: (xhr,status,error) => {
     }
   });
 }

 handleToggleOpen(isOpen) {
 	this.setState({
 		isOpen: !this.state.isOpen
 	});
 }

  async getEvent() {
   await fetch (`http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${this.state.lat}, ${this.state.lon}&within=14&t=today`)
    .then(res => res.json())
    .then(data => {
    this.setState({
        eventList: data.events.event
      })
    })
 }

 getCategory(categorySelected) {
    fetch (`http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${this.state.lat}, ${this.state.lon}&within=14&t=today&q=${categorySelected}`)
    .then(res => res.json())
    .then(data => {
      if (data.events === null) {
        return this.sweetalertfunction('Sorry!!..there are no '+ categorySelected +' events scheduled today');
      } else {
        this.setState({
            eventList: data.events.event
          })
      }
    })
 }


componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
      this.getEvent();
    });
 }


 render() {

   var eventInfo = this.state.eventList.map((item) =>
      [item.title, item.venue_name, item.longitude, item.latitude, item.start_time, item.description, item.id]);

   var locations = eventInfo.map((location) =>
      [location[3], location[2], location[0], location[1], location[5], location[6]]);
      console.log(locations)
   return (

     <div>

        <Form getCategory={this.getCategory} getEvent={this.getEvent}/>


            <div className= "col-md-6 mapstyle" style={{height:200}}>

               <Map locationInfo = {locations} eventId={this.state.eventId}/>

            </div>

            <div className= "scrollEvents col-md-6">

              <Events eventInfo ={eventInfo} openInfoWindow = {this.openInfoWindow}/>

            </div>

            <div>

              <Footer />

            </div>



    </div>

   );
 }
}

export default App;

// <div id="down">
// <footer>© 2009–2018 -What'sOnToday.com, Inc or its affiliates, Toledo 39. Col Juárez, Del. Cuauhtémoc. WhatsOnToday.com is operated by HolaCatTeam.</p></center>
// <br></br>
// <center><h6>Keep Up With Us</h6></center>
//
// <center><p>Join our facebook and we’ll stay in touch! You’ll be the first to know about special offers and the best events near you.</p></center>
// </footer>
// </div>
