import React, { useEffect, useState } from 'react';

function AppoinementForm(){
    const [technicians, setTechnicians] = useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    const [technician, setTechnicianChange] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [vin, setVin] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');


    const handleTechnicianChange = (event) => {
        setTechnicianChange(event.target.value);
    }
    const handleCustName = (event) => {
        setCustomerName(event.target.value);
    }
    const handleVinChange = (event) => {
        setVin(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        const data = {}
        data.customer_name = customerName;
        data.vin = vin;
        data.date = date;
        data.time = time;
        data.reason = reason;
        data.technician = technician;
       

        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            Headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setTechnicians([]);
            setCustomerName('');
            setVin('');
            setDate('');
            setTime('');
            setReason('');
        }
    }
    

    useEffect(() => {
        fetchData();
        }, []);

    return (
        <div className="row">
            <div className='offset-3 col-6'>
                <h1>Create Appointment</h1>
                <form id="create-conference-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <select required name='technician' id='technician' className="form-select" onChange={handleTechnicianChange} value={technician} >
                            <option value="">Choose a technician</option>
                            {technicians.map(technician => {
                                return (
                                    <option value={technician.id} key={technician.id}>
                                        { technician.name }
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            name='customer_name'
                            id='customer_name'
                            placeholder=''
                            required
                            type='text'
                            className='form-control'
                            onChange={handleCustName}
                            value={customerName}
                        />
                        <label htmlFor='customer_name'>Customer Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                        name='vin'
                        id='vin'
                        placeholder=''
                        required
                        type='text'
                        className='form-control'
                        onChange={handleVinChange}
                        value={vin}
                        />
                        <label htmlFor='vin'>VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                        name='date'
                        id='date'
                        placeholder=''
                        required
                        type='date'
                        className='form-control'
                        onChange={handleDateChange}
                        value={date}
                        />
                        <label htmlFor='date'>Date</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        name='time'
                        id='time'
                        placeholder=''
                        required
                        type='time'
                        className='form-control'
                        onChange={handleTimeChange}
                        value={time}
                        />
                        <label htmlFor='time'>Time</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input 
                        name='reason'
                        id='reason'
                        placeholder=''
                        required
                        type='text'
                        className='form-control'
                        onChange={handleReasonChange}
                        value={reason}
                        />
                        <label htmlFor='reason'>Reason</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );
}

export default AppoinementForm;