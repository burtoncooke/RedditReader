import React from 'react';
import { browserHistory, Link } from 'react-router';

import { Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



export default class Reddits extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      rooms: null
    };
  }

// display reddits in table format
  render() {
    return (
      <div>

        <h4> Your Reddits</h4>
            <div className="table-responsive">
            <table className="myTable">
              <tr>
                <th>Image</th>
                <th>{'Title             '}</th>
                <th>Author</th>
                <th>Comments</th>
                <th>Subreddit</th>
                <th>Submitted</th>
            
              </tr>

              {this.props.reddits ?

                this.props.reddits.sort((a,b) => b.data.created_utc - a.data.created_utc).map(reddit => {
                  var filler = reddit.data.thumbnail.slice(0,4) == 'http' ? "" : "no image";
                  var title = reddit.data.title.length > 40 ? reddit.data.title.slice(0,60) + '...' : reddit.data.title;
                  return (
                  <tr>
                    <td> <img src={reddit.data.thumbnail}/> {filler}</td>
                    <td> <a href={reddit.data.url}>{title}</a> </td>
                    <td> {reddit.data.author} </td>
                    <td><a href={'http://www.reddit.com/' + reddit.data.permalink}>{reddit.data.num_comments}</a></td>
                    <td> {reddit.data.subreddit}</td>
                    <td> {this.formatTime.call(this, reddit.data.created_utc * 1000)}</td>
                    
                  </tr>
                  );
                })

                :

                null
              }

            </table>

            </div>
           
      </div>
    );
  }

// format time of reddit to be human-readable
  formatTime(oldTime) {

    var currentTime = new Date().getTime(); 
    var timeMaker = {};

    var timeAgo = currentTime - oldTime; 
    var days = Math.floor(timeAgo / 86400000); 
    if(days !== 0) {
      timeMaker.days = days;
    }

    timeAgo -= days * 86400000; 
    var hours = Math.floor(timeAgo / 3600000); 
    if(hours !== 0) {
      timeMaker.hours = hours;
    }

    timeAgo -= hours * 3600000; 
    var minutes = Math.floor(timeAgo / 60000);
    if(minutes !== 0) {
      timeMaker.minutes = minutes;
    }
    
    
    return Object.keys(timeMaker).map(function(key) { 
      if(timeMaker[key] === 1) {
        var singularized = key.split(""); 
        singularized.pop();
        return timeMaker[key].toString() + ' ' + singularized.join(""); 
      } else {
        return timeMaker[key].toString() + ' ' + key; 
      }
    }).join(" ") + ' ago';
  }
}
