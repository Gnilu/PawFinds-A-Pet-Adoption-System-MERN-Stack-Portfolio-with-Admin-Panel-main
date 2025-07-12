import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/requests')
        if (!response.ok) {
          throw new Error('An error occurred')
        }
        const data = await response.json()
        setPetsData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests();
  }, [])

  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") {
      return true;
    }
    return pet.type === filter;
  });

  return (
    <>
      <div className="filter-selection">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Bird">Birds</option>
          <option value="Fish">Fishs</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="pet-container">
        {loading ?
          <p>Loading</p> : ((filteredPets.length > 0 ) ? (
            filteredPets.map((petDetail, index) => (
              <PetsViewer pet={petDetail} key={index} />
            ))
          ) : (
            <p className="oops-msg">Oops!... No pets available</p>
          )
          )
        }

         <style>{`
      .filter-selection {
    display: flex;
    flex-direction: row-reverse;
    padding: 20px 25px;
}
    
      .filter-selection select {
    font-family: "Varela Round", sans-serif;
    font-size: 14px;
    margin: 10px 0;
    color: #457B9D;
    border-color: #1C274C;
    padding: 10px;
    border-radius: 20px;
}

.filter-selection select:active {
    border: none;
}

.filter-selection select:after {
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
    border: 1px solid #f18040;
    width: 310px;
}

.oops-msg {
    margin-bottom: 30px;
}
`}</style>
      </div>
    </>
  );
};

export default Pets;
