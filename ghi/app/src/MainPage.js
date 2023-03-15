import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card" >
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default MainPage;
