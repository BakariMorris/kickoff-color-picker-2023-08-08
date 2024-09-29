'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ColorInput, ColorPickerContainer, SelectingCanvas } from './styles';

  interface PropTypes {
    onChange: Function,
    dataKey: number,
    color: string
  }

const ColorPicker = (props: PropTypes) => {
  const {color,onChange,dataKey} = props;

  const [showGradient, setShowGradient] = useState(false);
  const [isColorLight, setIsColorLight] = useState(true);

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
  }, []);

  // Changes text color to white or black depending on the background color
  useEffect(() => {
    const setLightOrDark = (color:string) => {
      let r, g, b;
      if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (color.startsWith('rgb')) {
        [r, g, b] = color.match(/\d+/g).map(Number);
      }
    
      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      setIsColorLight(brightness > 128) // Return true if the color is light
    };

    setLightOrDark(color);
  }, [color])

  const handleGradientClick = (e: any) => {
    if(!showGradient){
      e.preventDefault();
      return;
    }

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

    onChange(dataKey, hexColor)
    setShowGradient(false);
  };

  return (
    <ColorPickerContainer
      style={{ backgroundColor: color }}>
      <ColorInput
        style={{color: (isColorLight) ? 'black' : 'white'}}
        type="text"
        value={color}
        onClick={() => setShowGradient(true)}
      />
      <SelectingCanvas data-key={dataKey} ref={gradientRef} onClick={handleGradientClick}
      style={{opacity: (showGradient) ? '1': '0'}} />
    </ColorPickerContainer>
  );
};

export default ColorPicker;