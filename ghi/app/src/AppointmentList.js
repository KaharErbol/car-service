import React from "react";

class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            // inventory: [],
        };
        this.handleCancelAppointment = this.handleCancelAppointment.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            
            this.setState({
                appointments: data.appointments.filter(appointment => appointment.is_finished === false)
            })
        }
    }

    handleFinishAppointment = async (appointmentId) => {
        try {
            const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_finished: true }),
            });
            if (response.ok) {
                const updatedAppointment = await response.json();
                const updatedAppointments = this.state.appointments.map((appointment) =>
                    appointment.id === updatedAppointment.id ? updatedAppointment : appointment
                );
                this.setState({
                    appointments: updatedAppointments,
                });

                this.handleAppointment(appointmentId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    async handleCancelAppointment(appointmentId) {
        const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
        const response = await fetch(url, {
            method: 'DELETE'
        })
        if (response.ok) {
            this.handleAppointment(appointmentId);
        }

    }

    handleAppointment(id) {
        const newAppointments = this.state.appointments.filter(appointment => appointment.id !== id);
        this.setState({appointments: newAppointments});
    }

  
    
    render() {
        return (
            <div>
                <h1>Service Appointments</h1>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>VIP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(appointment => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                    <td>{ appointment.is_vip }</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" className="btn btn-danger" onClick={() => this.handleCancelAppointment(appointment.id)} >Cancel</button>
                                            <button type="button" className="btn btn-success" onClick={() => this.handleFinishAppointment(appointment.id)} >Finished</button>
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

export default AppointmentList;