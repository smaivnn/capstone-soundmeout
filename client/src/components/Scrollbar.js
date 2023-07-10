import React, { useRef } from "react";

function Scrollbar(props) {
  const containerRef = useRef();

  function handleWheel(e) {
   
    containerRef.current.scrollTop += e.deltaY;
  }

  let startY = 0;
  let startScrollTop = 0;

  function handleTouchStart(e) {
    startY = e.touches[0].clientY;
    startScrollTop = containerRef.current.scrollTop;
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const dy = e.touches[0].clientY - startY;
    containerRef.current.scrollTop = startScrollTop - dy;
  }

  return (
    <div
      className={props.className}
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {props.children}
    </div>
  );
}

export default Scrollbar;
