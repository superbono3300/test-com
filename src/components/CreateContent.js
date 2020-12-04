import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return ( 
    <article>
      <h3> Create </h3>
      <form action="/create_process" 
            method="post"
            onSubmit={function(e){
              e.preventDefault();
              //console.log(e.target.title.value);
              //console.log(e.target.desc.value);
              //debugger;
              this.props.onSubmit(
                e.target.title.value, e.target.desc.value
              );
              //console.log(e);
            }.bind(this)}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="desc" placeholder="description">

          </textarea>
        </p>
        <p>
          <input type="submit" value="submit"></input>
        </p>
      </form>
    </article>
    );
  }
}

export default CreateContent;