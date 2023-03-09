import { useState } from "react";

function TechnicianForm() {
    const [name, setName] = useState('');
    const [empNum, setEmpNum] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmpNumChange = (event) => {
        setEmpNum(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;
        data.employee_number = empNum;

        const url = 'http://localhost:8080/api/technicians/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            Headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setName('');
            setEmpNum('');
        } else {
            console.error(response);
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a technician</h1>
                    <form id="create-conference-form" onSubmit={ handleSubmit }>
                        <div className="form-floating mb-3">
                            <input 
                                placeholder=""
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                onChange={ handleNameChange }
                                value={ name } 
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                placeholder=""
                                required
                                type="number"
                                name="employee_number"
                                id="employee_number"
                                className="form-control"
                                onChange={ handleEmpNumChange }
                                value={ empNum }
                            />
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechnicianForm;