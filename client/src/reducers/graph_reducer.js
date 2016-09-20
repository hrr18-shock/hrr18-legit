import {
  BAR, LINE, RADAR, TEACHERS_STUDENTS, STUDENTS_SCORES, CLASS_AVERAGES
} from '../constants/ActionTypes.js'

function getAverageScores(set){
  var average = _.reduce(set.scores, (store, next) => {
      return store += next
    }
  ) / set.scores.length
  return average
}


export default function graphReducer(state = {
  option: BAR, chartData: {}
}, action){
  switch(action.type){
    case BAR:
      console.log('REDUCER change option to BAR')
      return Object.assign({}, state, {
        option: BAR
      })
    case LINE:
      console.log('REDUCER change option to LINE')
      return Object.assign({}, state, {
        option: LINE
      })
    case RADAR:
      console.log('REDUCER change option to RADAR')
      return Object.assign({}, state, {
        option: RADAR
      })
    case TEACHERS_STUDENTS:
      console.log('REDUCER change data to teacher_STUDENTS')
      var teacherLabels = [];
      var studentData = [];
      console.log(action.payload)
      _.each(action.payload.data, (set) => {
        teacherLabels.push(set.name)
        studentData.push(set.students.length)
      })
      return Object.assign({}, state, {
        labels: teacherLabels,
        data: studentData,
      })
    case STUDENTS_SCORES:
      console.log('REDUCER change data to STUDENTS_SCORES')
      var students = [];
      var assignmentAverages = [];
      console.log(action.payload.data, 'payload sent to reducer')
      _.each(action.payload.data, (set) => {
        var average = _.reduce(set.scores, (store, next) => {
            return store += next
          }
        ) / set.scores.length
        students.push(set.first)
        if(!average){
          average = 0
        }
        assignmentAverages.push(average)
      })
      console.log(students, assignmentAverages)
      return Object.assign({}, state, {
        labels: students.slice(students.length, -10),
        data: assignmentAverages.slice(students.length, -10),
      })
      case CLASS_AVERAGES:
        console.log('REDUCER change data to CLASS_AVERAGES')
        var teachers = [];
        var studentAveragesByTeacher = [];
        console.log(action.payload.data)
        _.each(action.payload.data, (set) => {
          var classAverageScore = _.reduce(set.students, (store, next) => {
              return store += getAverageScores(next)
            }
          , 0) / set.students.length
          teachers.push(set.name)
          console.log(classAverageScore)
          if(!classAverageScore){
            classAverageScore = 0
          }
          studentAveragesByTeacher.push(classAverageScore)
        })
        console.log(studentAveragesByTeacher)
        return Object.assign({}, state, {
          labels: teachers,
          data: studentAveragesByTeacher,
        })
    default:
      return state
  }
}