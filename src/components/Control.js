import React, { Component } from 'react';

class Control extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a 
              href="/create" 
              onClick={function(e){
                e.preventDefault();
                this.props.onChangeControl('create');
             }.bind(this)}
            >
              CREATE
            </a>
          </li>
          <li>
            <a 
              href="/update"
              onClick = {function (e) {
                e.preventDefault();
                this.props.onChangeControl('update');
              }.bind(this)
            }
            >
              UPDATE
            </a>
          </li>
          <li>
            <input 
              type="button" 
              value="DELETE"
              onClick = {
                function (e) {
                  e.preventDefault();
                  this.props.onChangeControl('delete');
                }.bind(this)
              }
            >
            </input>
          </li>
        </ul>
      </div>
    );
  }

}

export default Control;