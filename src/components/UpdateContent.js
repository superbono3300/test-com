import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({
      //title: e.target.value
      [e.target.name]: e.target.value
    });
  }

  render() {
    console.log(this.props.data);
    return ( 
    <article>
      <h3> Update </h3>
      <form action="/update_process" 
            method="post"
            onSubmit={function(e){
              e.preventDefault();
              //console.log(e.target.title.value);
              //console.log(e.target.desc.value);
              //debugger;
              this.props.onSubmit(
                this.state.id,
                this.state.title, 
                this.state.desc
              );
              //console.log(e);
            }.bind(this)}
      >
        <p>
          <input 
            type="hidden" 
            name="id" 
            value={this.state.id}
          >
          </input>
        </p>
        <p>
          <input 
            type="text" 
            name="title" 
            placeholder="title"
            value={this.state.title}
            onChange={this.inputFormHandler}
          >
          </input>
        </p>
        <p>
          <textarea 
            name="desc" 
            placeholder="description"
            value={this.state.desc}
            onChange={this.inputFormHandler}
          >
          </textarea>
        </p>
        <p>
          <input 
            type="submit" 
            value="submit"
          >
          </input>
        </p>
      </form>
    </article>
    );
  }
}

export default UpdateContent;