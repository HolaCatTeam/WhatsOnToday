import React, {Component} from 'react';


const Eventitem = props => (

  <div>
    {<div id={props.event[6]}>
    <div className= 'col-md-12'>
      <h4 onClick={() => props.openInfoWindow(props.event[6])}>{props.event[0]}</h4>
          <p className='eventLetter'>Where: {props.event[1]}</p>
          <p className='eventLetter'>When:  {props.event[4]}</p><br />
      </div>
    </div>
     }
  </div>

)

export default Eventitem;
