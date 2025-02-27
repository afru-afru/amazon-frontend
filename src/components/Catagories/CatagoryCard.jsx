// import React from 'react';
import PropTypes from 'prop-types';

function CatagoryCard({ data }) {
  console.log("Data received in CatagoryCard:", data);

  if (!data) {
    return <div>Data is undefined</div>;
  }

  const { title, imageLink } = data;
  return (
    <div style={{ backgroundColor: "white", margin: "10px", padding: "10px" }}>
      <a href="#">
        <span>
          <h2>{title}</h2>
        </span>
        <img src={imageLink} alt={title} style={{ maxWidth: '100%' }} />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

// Define prop types for validation
CatagoryCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default CatagoryCard;