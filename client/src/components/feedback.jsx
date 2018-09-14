import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Add from './add.js'

class Comments extends React.Component {
 constructor (props){
   super(props);
   this.state = {
     eventList: [],
     lat: null,
     lon: null,
     description:'',
     category: ''
   }

   this.addComment= this.addComment.bind(this);

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

   render(){
     return (
       <div>
        <Add addComment={this.addComment}/>
       </div>
       
     )
   }

 }
 export default Comments;
