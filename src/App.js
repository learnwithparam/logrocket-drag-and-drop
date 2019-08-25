import React, { useCallback } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      <MyDropzone onDrop={onDrop} />
    </div>
  );
}

export default App;
