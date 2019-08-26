import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const type = "Image"; // Need to pass which type element can be draggable

const Image = ({ image, index, id, moveImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Move the content
      moveImage(dragIndex, hoverIndex);
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // initialize drag and drop into the element
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="file-item"
    >
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

const ImageList = ({ images, onUpdate }) => {
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        index={index}
        key={`${image.id}-image`}
        id={image.id}
        moveImage={onUpdate}
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;
