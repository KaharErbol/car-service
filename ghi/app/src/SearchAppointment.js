import { useState, useEffect } from "react";


function SearchAppointment(){
    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        setVin(event.target.value);
    }

    const [appointments, setAppointments] = useState([]);
    const handleButtonClick = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            const appointments = data.appointments;
            const filteredAppointments = appointments.filter(appointment => appointment.vin === vin);
            setAppointments(filteredAppointments);
        }
    }

    // useEffect(() => {
    //     handleButtonClick();
    //     }, []);

    return (
        <div className="row">

                <form id="create-conference-form">
                    <div className="input-group mb-3">
                    <input
                        name="vin"
                        id="vin" 
                        type="search" 
                        className="form-control" 
                        placeholder="Search VIN" 
                        aria-label="Search VIN" 
                        aria-describedby="button-addon2"
                        onChange={handleVinChange}
                        value={vin} 
                    />
                    <button onClick={handleButtonClick} className="btn btn-outline-secondary" type="button" id="button-addon2">
                        Search
                    </button>
                    </div>
                </form>
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
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => {
                            return (
                                <tr key={appointment.id} value={appointment.id}>
                                    <td>{ appointment.vin }</td>
                                    <td>{ appointment.customer_name }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.time }</td>
                                    <td>{ appointment.technician.name }</td>
                                    <td>{ appointment.reason }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

        </div>
    );
}

export default SearchAppointment;