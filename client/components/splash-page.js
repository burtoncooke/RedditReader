import React from 'react';
import { browserHistory, Link } from 'react-router';

import { Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SubRedditList from './subreddit-list.js';
import Reddits from './reddits.js'

var showingAllTopics = true;

export default class SplashPage extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redditData: null,
      subReddits: [],
      reddits: []
    };
  }

  componentWillMount() { 

    var fullurl = 'http://www.reddit.com/reddits.json?jsonp=?'
    var setState = this.setState.bind(this);
    $.getJSON(fullurl, function(json){
      var list = json.data.children;
      console.log("got listing:", list);
      $.getJSON('http://www.reddit.com/r/all.json?jsonp=?', function(data) {

        var reddits = data.data.children;
        console.log("showing reddits:", reddits);
        setState({
          reddits: reddits,
          subReddits: list.map(item => item.data.display_name)
        })
      })
      // var html = '<ul class="linklist">\n';
    })
    
 
  }

  toggleCheck(event) {

    var setState = this.setState.bind(this);
    var reddits = this.state.reddits;

    if(event.target.checked) {


      $.getJSON(`http://www.reddit.com/r/${event.target.value}.json?jsonp=?`, function(json){
        var list = json.data.children;
        console.log("got listing:", list);

        if(showingAllTopics) {

          showingAllTopics = false;
          setState({reddits: json.data.children})
        }
        else {

          setState({reddits: reddits.concat(json.data.children)})
        }

        // var html = '<ul class="linklist">\n';
      })
      
    }
    else {
      var filtered = reddits.filter(reddit => reddit.data.subreddit != event.target.value)

      if(!filtered.length) {
        $.getJSON('http://www.reddit.com/r/all.json?jsonp=?', function(data) {

          showingAllTopics = true;

          // console.log("got reddits:", reddits)
          var reddits = data.data.children;
          setState({
            reddits: reddits
          })
        })
      }
      setState({reddits: filtered})
    }
  }

  render() {

    return (
      <div>
        <Grid>
          <Row>
            <Col md={8} >

               <Reddits 
                reddits={this.state.reddits} 
              />
            </Col>

            <Col md={4} >

              <SubRedditList
                toggleCheck={this.toggleCheck.bind(this)}
                subReddits={this.state.subReddits}
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );

    
  }
}
