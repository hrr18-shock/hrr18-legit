// This component renders the summary info of whatever class was clicked on from the left column
import React from 'react'

import { browserHistory } from 'react-router'
import axios from 'axios'
// const Modal = require('react-modal');
class DashboardRightColDetail extends React.Component {
  constructor (props) {
    super(props)
  }

  scoreAssignment (assignmentId, assignmentName) {
    localStorage.setItem('assignmentId', assignmentId)
    localStorage.setItem('assignmentName', assignmentName)
    browserHistory.push('/studentscoreform');
  }

  displayScore (index) {
    if(this.props.currentstudent.data.scores[index]){
      return this.props.currentstudent.data.scores[index].Student_Outcomes.score;
    } else {
      return "Not Graded";
    }
  }

  renderDetails (props) {
    console.log("PROPS", this.props)
  // if student has been select render assignment and scores on right hand side.
    if (this.props.currentstudent.data.currentstudent.first) {
      return (
        <div className='studentDetails'>
          <h1> {this.props.currentstudent.data.currentstudent.first} {this.props.currentstudent.data.currentstudent.last} </h1>
            {this.props.currentstudent.data.assignments.map(function (assignment, index) {
              return <div onClick={function(){this.scoreAssignment(assignment.id, assignment.name);}.bind(this)} key={assignment.id} className='dashboardLeftColItem clearfix'><span>
                Assignment: {assignment.name}
                <br />
                Score: {this.displayScore(index)} / 100
                <br />
                <span>Click To Set Student Score...</span>
              </span> </div>
            }, this)}
        </div>
   ) } }
  render () {
    return (
      <div>
      {this.renderDetails() }
      </div>
    )
  }
};

export default DashboardRightColDetail

