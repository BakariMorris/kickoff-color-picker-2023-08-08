'use client';

import { ReactNode, useEffect, useState } from 'react';
import ColorPicker from '@/components/ColorPicker/index';
import styled from 'styled-components';
import axios from 'axios';


const PaletteContainer = styled.div`
display: flex-col;
`;


const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SaveButton = styled.button`
  display: block;
  background-color: white;
  color: black;
`;


interface IColor {
  id: number,
  color: string
}



const PaletteCreator = () => {
  const [colorPickers, setColorPickers] = useState<Array<ReactNode>>([]);
  const [paletteData, setPaletteData] = useState<Array<IColor>>([]);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setColorPickers((prevItems) => [...prevItems, <ColorPicker onChange={onChangeHandler} key={i} dataKey={i} />]);
      setPaletteData((prevItem) => [...prevItem, { id: i, color: '#000' }])
    }
  }, [])

  const onClickHandler = async() => {
    await saveNewPalette();
    // Save the current Palette data to the database
  }

  const saveNewPalette = async () => {
    const { status, data } = await axios.put("/api/palette", {
      colors: JSON.stringify(paletteData) 
  });

    console.log(status, 'status')
    console.log(data, 'data')
  }

  const getPallete = async () => {
    const { status, data } = await axios.get("/api/palette");
    
    console.log(status, 'status')
    console.log(data, 'data')
  }


  const onChangeHandler = (id: number, newColor: string) => {
    id = Number(id)
    setPaletteData((prevItems) => {
      const newItems = prevItems.map((item): IColor => (
        (item.id === id) ? { ...item, color: newColor } : item
      ))
      return newItems;
    })

  }

  return (
    <PaletteContainer>
      <ColorPickerContainer>
        {colorPickers}
      </ColorPickerContainer>
      
      <SaveButton onClick={onClickHandler}>Save Palette Data</SaveButton>
    </PaletteContainer>
  )
}

export default PaletteCreator;