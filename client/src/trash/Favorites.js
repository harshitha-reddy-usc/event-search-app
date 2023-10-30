// import React, { useState, useEffect } from 'react';
// import { Trash } from 'react-bootstrap-icons';
// import "../css/favorites.css";


// const heartButtonStyle = {
//     backgroundColor: 'white',
//     borderRadius: '50%',
//     padding: '5px',
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
//     border: 'none',
//     margin: '5px'
//   };

//   const heartIconStyle = {
//     color: 'black',
//     fontSize: '20px',
//     border: 'none',

//   };


// function Favorites() {
//     //TODO: dynamic data.
//     const [events, setEvents] = useState([
//         // // {id: 1, date: '2023-08-16', event:'Test Event1', category: 'Rock', venue: 'ASU'},
//         // // {id: 2, date: '2023-08-16', event:'Test Event2', category: 'Rock', venue: 'ASU'},
//         // // {id: 3, date: '2023-08-16', event:'Test Event3', category: 'Rock', venue: 'ASU'},
//         // {id: 4, date: '2023-08-16', event:'Test Event4', category: 'Rock', venue: 'ASU'}
//     ]);

//     // const [storedData, setStoredData] = useState([]);

//     useEffect(() => {
//       const storedItems = [];
//       for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         const value = JSON.parse(localStorage.getItem(key));
//         // storedItems.push({ key, value });
//         storedItems.push(value);
//       }
//       setEvents(storedItems);
//       console.log(events);
//     }, []);

//     if (events.length === 0) {
//         return(
//             <div className="favnodata">
//             <p className="no-data-class">No favorite events to show</p>
//             </div>
//         );
//         }
    
//     const removeElement = (index, e) => {
//         setEvents(events.filter((v, i) => i !== index));
//     }

//     const deleteFavorite = (favId, eveId, e) => {
//         console.log(favId);
//         setEvents(events.filter((v, i) => i !== favId));
//         alert("Removed from Favorites!");
//         localStorage.removeItem(eveId);
//         if (events.length === 0) {
//             return(
//                 <div className="favnodata">
//                 <p className="no-data-class">No favorite events to show</p>
//                 </div>
//             );
//             }
//       }

//     return (
//         <div className="container">
//             <h3 className="p-3 text-center">List of your favorite events</h3>
//             <table className="table table-striped table-bordered">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Date</th>
//                         <th>Event</th>
//                         <th>Category</th>
//                         <th>Venue</th>
//                         <th>Favorite</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {events.map((eve, index) =>
//                         <tr key={eve.id}>
//                             <td>{index}</td>
//                             <td>{eve.date}</td>
//                             <td>{eve.event}</td>
//                             <td>{eve.category}</td>
//                             <td>{eve.venue}</td>
//                             {/* <td><button onClick={e => removeElement(eve.id, e)}>del</button></td> */}
//                             <td>
//                             <button onClick={(e) => deleteFavorite(index, eve.id, e)}>
//                             <Trash style={heartIconStyle}  />
// </button>
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export { Favorites };