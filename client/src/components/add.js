import React, {Component} from 'react';
import SweetAlert from 'sweetalert';


class Add extends Component {
  constructor(props){
    super(props)
    this.state = {
      description : ''
    }
    this.handleComments = this.handleComments.bind(this);
    this.add = this.add.bind(this);

  }

  handleComments(e){
    e.preventDefault();
    this.setState({description: e.target.value})
  }

  add(e){
    e.preventDefault();
    this.props.addComment(this.state.description);
    this.setState({
      description : ''
    })
  }

  render() {
    return (

          <div className="text-right" >

            <center><input className="comments radius form-control-sm form-control-lg"  type='text'  placeholder='             Speak out, let us know what you think about Us!!.. any special event we are not covering??' value={this.state.description} onChange={this.handleComments}></input>

            <button className="send btn btn-primary btn-lg" onClick={this.add}> Send </button></center>
            
          </div>


    );
  }
}

export default Add;
