/* eslint-disable react/prop-types */

const DisplayFilm = ({ x }) => {
  return (
    <div key={x._id}>
      <h1 className="text-2xl font-bold">{x.title}</h1>
      <img
        src={x.alternate || x.photo || "No image available"}
        height={500}
        alt={`Image of ${x.title}`}
        className="mt-2 rounded-md"
      />
      <br></br>
      {x.photo ? <img src={x.photo} alt={`Image of ${x.title}`}></img> : ""}
      <div>
        <p>{x.rating ? `Rated ${x.rating}/10` : <h1>Unrated!</h1>}</p>
      </div>
    </div>
  );
};

export default DisplayFilm;
