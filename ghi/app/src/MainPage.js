import { useState, useEffect } from "react";

function MainPage() {

  const [pics, setPics] = useState([]);
  const [backImg, setBackImg] = useState('');
  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setPics(data.models);
    }

    const backImgUrl = 'http://localhost:8100/api/models/6';
    const imgRespose = await fetch(backImgUrl);
    if (imgRespose.ok) {
      const data = await imgRespose.json();
      setBackImg(data.picture_url);

    }

  }



  useEffect(() => {
    fetchData();
    }, []);


  return (
    <>
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Vintage Car Service and Sales
        </p>
        <img src={backImg} className="img-fluid" alt="Backgrounf Image"/>
        <h2>Latest Collections</h2>
      </div>
      <div className="container text-center">
        <div className="row row-cols-3">
        {pics.slice(-4).map(pic => {
        return (
          <div key={pic.id} className="col-sm-6">
            <div className="card" >
                <img src={pic.picture_url} className="card-img-top card-img-custom" alt="..." style={{height: "400px", objectFit: "cover"}}/>
                <div className="card-body">
                  <h5 className="card-title">{pic.name}</h5>
                  <p className="card-text">Manufacturer: {pic.manufacturer.name}</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
          </div>
        );
      })}
        </div>
      </div>
    </div>
    </>
  );
}

export default MainPage;
