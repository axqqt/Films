import data from "./verc.json";

const WhatPage = () => {
  return data.map((x, index) => (
    <div key={index}>
      <h1>{x.name}</h1>
      <h2>Type: {x.category}</h2>
      <p>{x.price}</p>
      <p>{x.stocked ? "In Stock" : "Out of Stock"}</p>
    </div>
  ));
};

export default WhatPage;
