import React from 'react';
import { browserHistory, Link } from 'react-router';


import { Button } from 'react-bootstrap';


export default class SubRedditList extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      rooms: null
    };
  }

render() {
    console.log("inside render in subreddit list:", this.props.subReddits)
    return (
      <div className='filterRoomContainer col-md-12 col-sm-6'>
      {this.props.subReddits ?
      <div>
      <h4>Choose Your Subreddits</h4>
        <ul>
          {this.props.subReddits.map((subReddit, index) => {
           
            return (
              <li key={index}>
              <label htmlFor={index} >
              <input type="checkbox" id={index} name="choice" value={subReddit} onChange={(event) => this.props.toggleCheck(event)} />
                  {subReddit}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      : null}
      </div>
    );
  }
}
