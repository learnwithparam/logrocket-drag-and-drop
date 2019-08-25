import React, { useCallback } from "react";
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
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  return (
    <div className="App">
      <MyDropzone onDrop={onDrop} accept={"image/*"} />
    </div>
  );
}

export default App;
