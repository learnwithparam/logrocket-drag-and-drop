import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import cuid from "cuid";

import Dropzone from "./Dropzone";
import ImageList from "./ImageList";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onUpdate = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} onUpdate={onUpdate} />
      </DndProvider>
    </main>
  );
}

export default App;
