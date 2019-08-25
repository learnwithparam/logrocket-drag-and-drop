import React, { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import "./App.css";

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
      <Dropzone onDrop={onDrop} accept={"image/*"} />
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
