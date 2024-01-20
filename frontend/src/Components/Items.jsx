/* eslint-disable react/prop-types */
const ItemsPage = ({ data }) => {
  return (
    <div>
      <h1>{data.itemName}</h1>
      <p>{data.itemDescription}</p>
      <h3>{data.itemQuantity} Items available in stock</h3>
      <h4>{data.itemAvailability ? "In Stock" : "Out of stock"}</h4>
      <img
        alt={`Image of ${data.itemName}`}
        src={data.itemPhoto}
        height={"fit-content"}
      ></img>
    </div>
  );
};

export default ItemsPage;
