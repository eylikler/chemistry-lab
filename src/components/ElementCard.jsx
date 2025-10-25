import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

const ElementCard = ({ element }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.symbol,
    data: element,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="element-card"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="element-card-inner"
        style={{
          backgroundColor: element.color,
          color: element.textColor,
        }}
      >
        <div className="atomic-number">{element.atomicNumber}</div>
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
      </div>
    </motion.div>
  );
};

export default ElementCard;

