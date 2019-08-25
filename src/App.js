import React, { useCallback, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

const MyDropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Drop the files here ...</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImages(prevState => [...prevState, e.target.result]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop</h1>
      <MyDropzone onDrop={onDrop} accept={"image/*"} />
      {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <ul className="file-list">
        {images.map((image, index) => (
          <li key={`img-${index}`} className="file-item">
            <img alt={`img - ${index}`} src={image} className="file-img" />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
