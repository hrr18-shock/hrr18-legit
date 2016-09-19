// Holds the list of classes
//React
import React from 'react';

// Components
import DashboardLeftColItem from './M_dashboardLeftColItem.jsx';

class DashboardLeftCol extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="dashboardLeftCol">
                <ul>
                    {this.props.classes.map(function(classDetails) {
                        return (
                            <DashboardLeftColItem
                                key={classDetails.id}
                                classDetails={classDetails}
                                selectClass={this.props.selectClass}
                            />
                        )
                    }, this)}
                </ul>
            </div>
        )
    }
}

export default DashboardLeftCol;