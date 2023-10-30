import React, { useState, useEffect } from 'react';
import { Trash } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


import "../css/favorites.css";

export default function Favorites() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const storedItems = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        // storedItems.push({ key, value });
        storedItems.push(value);
      }
      setEvents(storedItems);
      console.log(events);

    }, []);

    if (events.length === 0) {
        return(
            <div className="favnodata">
            <p className="no-data-class">No favorite events to show</p>
            </div>
        );
        }
    
    const removeElement = (index, e) => {
        setEvents(events.filter((v, i) => i !== index));
    }

    const deleteFavorite = (favId, eveId, e) => {
        console.log(favId);
        setEvents(events.filter((v, i) => i !== favId));
        alert("Removed from Favorites!");
        localStorage.removeItem(eveId);
        if (events.length === 0) {
            return(
                <div className="favnodata">
                <p className="no-data-class">No favorite events to show</p>
                </div>
            );
            }
      }

    return (
        <>
            <div className="container-fluid text-center table-responsive-md col-md-7 p-auto m-auto" style={{ marginTop: 30, marginBottom: 30 }}>
                    <div id="heading9">List of your favorite events</div>
                {/* <table className="table table-striped table-bordered" id="favTable"> */}
                <Table id="favTable" className=" table table-striped p-auto my-0" style={{ color: "white", borderRadius: 10}}>
                <thead id="tabHead">
                    <tr>
                        <th style={{color: "black"}}>#</th>
                        <th style={{color: "black"}}>Date</th>
                        <th style={{color: "black"}}>Event</th>
                        <th style={{color: "black"}}>Category</th>
                        <th style={{color: "black"}}>Venue</th>
                        <th style={{color: "black"}}>Favorite</th>
                    </tr>
                </thead>
                <tbody id='favList'>
                    {events.map((eve, index) =>
                        <tr key={eve.id}>
                            <td>{index+1}</td>
                            <td>{eve.date}</td>
                            <td>{eve.event}</td>
                            <td>{eve.category}</td>
                            <td>{eve.venue}</td>

                            <td>
                            <Button id="trashButton" variant="light" onClick={(e) => deleteFavorite(index, eve.id, e)}>
                                {(<Trash />)}
                            </Button>
                            </td>


                        </tr>
                    )}
                </tbody>
                </Table>
        </div>
        </>
    );
}

// export { Favorites };