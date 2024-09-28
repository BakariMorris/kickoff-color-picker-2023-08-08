'use client';
import React, { useState, useRef, useEffect, ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface PropTypes {
  onChange: Function,
  dataKey: number
}

const ColorPickerContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const ColorInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  color: black;
`;


const ColorPicker = (props: PropTypes) => {
  const [color, setColor] = useState('#000');
  const [showGradient, setShowGradient] = useState(false);

  const containerRef = useRef(null);
  const gradientRef = useRef(null);

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

  const handleGradientClick = (e: any) => {
    const ctx = gradientRef.current?.getContext('2d');
    const bounds = gradientRef.current?.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = `#${(
      (1 << 24) +
      (pixelData[0] << 16) +
      (pixelData[1] << 8) +
      pixelData[2]
    )
      .toString(16)
      .slice(1)}`;

    setColor(hexColor);
    props.onChange(e.target.dataset.key, hexColor)
    setShowGradient(false);
  };

  return (
    <ColorPickerContainer>
      <ColorInput
        type="text"
        value={color}
        onClick={() => setShowGradient(true)}
      />
       <div ref={containerRef} style={{ 
        opacity: (showGradient) ? '1' : '0', 
        height: (showGradient) ? '100%' : '0',
        width: (showGradient) ? '100%' : '0', }}
        onClick={handleGradientClick}>
        <canvas data-key={props.dataKey} ref={gradientRef} />
      </div>
    </ColorPickerContainer>
  );
};

export default ColorPicker;