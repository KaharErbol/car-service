import { useState, useEffect } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const modelUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(modelUrl);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');

    const handleColor = (event) => {
        setColor(event.target.value);
    }
    const handleYear = (event) => {
        setYear(event.target.value);
    }
    const handleVin = (event) => {
        setVin(event.target.value);
    }
    const handleModelChange = (event) => {
        setModel(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            Headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setModels([]);
            setColor('');
            setYear('');
            setVin('');
        }
    }

    useEffect(() => {
        fetchData();
      }, []);
    

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new vehicle</h1>
            <form id="create-conference-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <select required name="model_id" id="model_id" className="form-select" onChange={handleModelChange} value={model}>
                    <option value="">Choose a model</option>
                    {models.map(model => {
                      return (
                          <option value={model.id} key={model.id}>
                              {model.name}
                          </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input 
                  placeholder="" 
                  required type="text" 
                  name="color" 
                  id="color" 
                  className="form-control"
                  onChange={handleColor}
                  value={color}
              />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  placeholder="" 
                  required type="text" 
                  name="year" 
                  id="year" 
                  className="form-control"
                  onChange={handleYear}
                  value={year}
              />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  placeholder="" 
                  required type="text" 
                  name="vin" 
                  id="vin" 
                  className="form-control"
                  onChange={handleVin}
                  value={vin}
              />
                <label htmlFor="vin">VIN</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default AutomobileForm;