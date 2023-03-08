import React from 'react';


class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: []
        }
    }

    async componentDidMount() {
        // const url = "http://localhost:8100/api/automobiles/"
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({
                autos: data.autos
            })
        }
    }

    render() {
      return (
        <div>
          <h1>Automobiles</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.autos.map(auto => {
                return (
                  <tr key={auto.vin}>
                    <td>{auto.vin}</td>
                    <td>{auto.color}</td>
                    <td>{auto.year}</td>
                    <td>{auto.model.name}</td>
                    <td>{auto.model.manufacturer.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
}
  export default AutomobileList;

// import React from "react";

// class AutomobileList extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             autos: []
//         }
//     }

//     async componentDinMount() {
//         const url = 'http://localhost:8100/api/automobiles/';
//         const response = await fetch(url);
//         console.log(response)
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             this.setState({
//                 autos: data.autos
//             })
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Automobile List</h1>
//                 <table className="table table-dark table-striped">
//                     <thead>
//                         <tr>
//                             <th>VIN</th>
//                             <th>Color</th>
//                             <th>Year</th>
//                             <th>Model</th>
//                             <th>Manufacturer</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.autos.map(auto => {
//                             console.log(auto)
//                             return (
//                                 <tr key={auto.href}>
//                                     <td>{auto.vin}</td>
//                                     <td>{auto.color}</td>
//                                     <td>{auto.year}</td>
//                                     <td>{auto.model.name}</td>
//                                     <td>{auto.model.manufacturer.name}</td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

// export default AutomobileList;

// function AutomobileList(props) {
//     if (!props.autos || !Array.isArray(props.autos)) {
//         return null;
//       }
//     return (
//         <>
//           <table className="table table-dark table-striped">
//             <thead>
//                 <tr>
//                     <th>VIN</th>
//                     <th>Color</th>
//                     <th>Year</th>
//                     <th>Model</th>
//                     <th>Manufacturer</th>
//                 </tr>
//             </thead>
//             <tbody>
//             {props.autos.map(auto => {
//                 return (
//                     <tr key={auto.vin}>
//                         <td>{auto.vin}</td>
//                         <td>{auto.color}</td>
//                         <td>{auto.year}</td>
//                         <td>{auto.model}</td>
//                         <td>{auto.manufacturer}</td>
//                     </tr>
//                 );
//             })}
//             </tbody>
//           </table>

//         </>
//     );
// }

