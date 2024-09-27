'use client';
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';

interface PropTypes {
  onChange: Function
  }


const ColorPickerLogic = ({ onChange }: PropTypes) => {
  const [color, setColor] = useState('#ff0000');
  const [showGradient, setShowGradient] = useState(true);

  const containerRef = useRef(null);
  const gradientRef = useRef(null);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  useEffect(() => {
    const setGradient = () => {
      const ctx = gradientRef.current?.getContext('2d');
      const bounds = gradientRef.current?.getBoundingClientRect();
      
      const gradient = ctx.createLinearGradient(0, 0, bounds.width, 0);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.16, 'orange');
      gradient.addColorStop(0.33, 'yellow');
      gradient.addColorStop(0.5, 'green');
      gradient.addColorStop(0.66, 'blue');
      gradient.addColorStop(0.83, 'indigo');
      gradient.addColorStop(1, 'violet');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    setGradient()
  }, [])

  const handleGradientClick = (e:any) => {
    const ctx = gradientRef.current?.getContext('2d');
    const bounds = gradientRef.current?.getBoundingClientRect();
    
    // Trying to find the position of our mouse in the gradient
    
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    console.log(x,y)
    const hexColor = `#${(
      (1 << 24) +
      (pixelData[0] << 16) +
      (pixelData[1] << 8) +
      pixelData[2]
    )
      .toString(16)
      .slice(1)}`;

    setColor(hexColor);
    if (onChange) {
      onChange(hexColor);
    }
    setShowGradient(false);
  };

  return (
    <div>
      <input
        className='text-black'
        type="text"
        value={color}
        onChange={handleColorChange}
        onClick={() => setShowGradient(true)}
        
      />
      <div ref={containerRef} style={{display: (showGradient) ? 'block' : 'none'}} className='p-10 bg-white'  onClick={handleGradientClick}>
        <canvas ref={gradientRef} />
      </div>
      <h1 style={{color: color}}>TESTING TESTING</h1>
    </div>
  );
};

export default ColorPickerLogic;