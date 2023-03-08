import React, { useEffect, useState } from 'react';


function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    const [modelName, setModelName] = useState('');

    const handleModelName = (event) => {
        setModelName(event.target.value);
    }

    const [picture_url, setPictureUrl] = useState('');

    const handlePicture = (event) => {
        setPictureUrl(event.target.value);
    }

    const [manufacturer, setManufacturerChange] = useState('');

    const handleManfacturer = (event) => {
        setManufacturerChange(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {}
        
        data.name = modelName;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer;

        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            Headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {
            setManufacturers([]);
            setModelName('');
            setPictureUrl('');
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Model</h1>
            <form id="create-conference-form" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input 
                  placeholder="" 
                  required type="text" 
                  name="name" 
                  id="name" 
                  className="form-control"
                  onChange={handleModelName}
                  value={modelName}
              />
                <label htmlFor="model_name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  placeholder="" 
                  required type="url" 
                  name="picture_url" 
                  id="picture_url" 
                  className="form-control"
                  onChange={handlePicture}
                  value={picture_url}
              />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select required name="manufacturer_id" id="manufacturer_id" className="form-select" onChange={handleManfacturer} value={manufacturer}>
                    <option value="">Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                          <option value={manufacturer.id} key={manufacturer.id}>
                              {manufacturer.name}
                          </option>
                      );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ModelForm;