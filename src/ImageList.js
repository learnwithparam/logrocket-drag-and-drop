import React from "react";

const Image = ({ image, index }) => {
  return (
    <li className="file-item">
      <img alt={`img - ${index}`} src={image} className="file-img" />
    </li>
  );
};

const ImageList = ({ images }) => {
  return (
    <ul className="file-list">
      {images.map((image, index) => (
        <Image image={image} index={index} key={`img-${index}`} />
      ))}
    </ul>
  );
};

export default ImageList;
