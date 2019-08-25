import React, { useCallback, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImages(snapshotImages => [...snapshotImages, e.target.result]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <div className="App">
      <MyDropzone onDrop={onDrop} accept={"image/*"} />
      <ul>
        {images.map((image, index) => (
          <li key={`img-${index}`}>
            <img alt={`img - ${index}`} src={image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
