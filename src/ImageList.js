import React, { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const type = "Image"; // Need to pass which type element can be draggable

const Image = ({ image, index, id, moveImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveImage(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.5 : 1;

  // initialize drag and drop into the element
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="file-item">
      <img alt={`img - ${index}`} src={image} className="file-img" />
    </div>
  );
};

const ImageList = ({ images, onUpdate }) => {
  const moveImage = useCallback(
    (dragIndex, hoverIndex) => {
      onUpdate(dragIndex, hoverIndex);
    },
    [onUpdate]
  );

  const renderImage = (image, index) => {
    const id = `img-${index}`;
    return (
      <Image
        image={image}
        index={index}
        key={id}
        id={id}
        moveImage={moveImage}
      />
    );
  };

  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageList;
