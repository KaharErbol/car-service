import React from "react";

class ModelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            models: []
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                models: data.models
            })
        }
    }

    
    async handleCancelAppointment(modelId) {
        const url = `http://localhost:8100/api/models/${modelId}`;
        const response = await fetch(url, {
            method: 'DELETE'
        })
        if (response.ok) {
            this.handleAppointment(modelId);
        }

    }

    handleAppointment(id) {
        const newModels = this.state.models.filter(model => model.id !== id);
        this.setState({models: newModels});
    }


    render() {
        return (
            <div>
                <h1>Model List</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.models.map(model => {
                            return (
                                <tr key={model.id} value={model.id}>
                                    <td>{ model.id }</td>
                                    <td>{ model.name }</td>
                                    <td>{ model.manufacturer.name }</td>
                                    <td><img src={model.picture_url}  width="200" height="150" /></td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-danger" onClick={() => this.handleCancelAppointment(model.id)} >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }


}

export default ModelList;