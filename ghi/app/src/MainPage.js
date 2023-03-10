import { useState, useEffect } from "react";

function MainPage() {

  const [pics, setPics] = useState([]);
  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setPics(data.models);
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
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
    </div>
    </>
  );
}

export default MainPage;
