// Dashboard summary is the component above the two columns in the dashboard
import React from 'react'

import axios from 'axios'
// all props passed down from dashboardClass_component
class DashboardSummary extends React.Component {
  constructor (props) {
    super(props)
    this.average = 0;
    this.findAverage = this.findAverage.bind(this);
  }

  findAverage () {
    console.log(this.props.data.assignments);
    var count = 0;
    var total = 0;
    var that = this;
    for(var i = 0; i < this.props.data.assignments.length; i++){
      axios.get('/api/report/assignments/' + this.props.data.assignments[i].id).then(function(response){
        console.log("MAX SCORE", response.data.average);
        if(response.data.average){
          total += response.data.average
          count++;
        }
      })
    }
  }

  componentWillMount () {
    this.findAverage();
  }

  render () {
    console.log(this.props)
    return (
      <div className='clearfix dashboardSummary'>
        <div className='dashboardSummaryProf'>
          <img src='http://yadayadacreative.com/projects/biology.jpg' alt='' />
          <h3>{this.props.data.details.name} </h3>
          <a href='/assignmentform' className='button'>Add Assignment</a>
        </div>
        <div className='dashboardSummaryStats clearfix'>
          <div>
            <p>78</p>
            <h5>Class Average</h5>
          </div>
          <div>
            <p> {this.props.data.students.length}</p>
            <h5>Number of Students</h5>
          </div>
          <div>
            <p>{this.props.data.assignments.length}</p>
            <h5>Number of Assignments</h5>
          </div>
        </div>
      </div>
    )
  }
}
export default DashboardSummary
