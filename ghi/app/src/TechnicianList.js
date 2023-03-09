import React from 'react';

class TechnicianList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: "Technician List"
        };
    }

    render() {
        return (
            <p>{ this.state.value }</p>
        );
    }
}

export default TechnicianList;