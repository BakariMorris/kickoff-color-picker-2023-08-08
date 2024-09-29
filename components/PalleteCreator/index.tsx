'use client';

import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import ColorPicker from '@/components/ColorPicker/index';
import styled from 'styled-components';
import axios from 'axios';
import PaletteHeader from './header';
import toast from 'react-hot-toast';

const ColorPickerContainer = styled.div`
  display: flex;
`;

interface IColor {
  id: number,
  color: string,
}


const PaletteCreator = () => {
  const [colorPickers, setColorPickers] = useState<Array<ReactNode>>([]);
  const [colorData, setColorData] = useState<Array<IColor>>([]);
  const [paletteName, setPaletteName] = useState<string>('NoName');

  useEffect(() => {
    //Remove this after dev
    console.log('Running this useEffect again')
    setColorData([])
    for (let i = 0; i < 5; i++) {
      setColorPickers((prevItems) => [...prevItems, <ColorPicker onChange={onChangeHandler} key={i} dataKey={i} />]);
      setColorData((prevItem) => [...prevItem, { id: i, color: '#000' }])
    }
  }, [])

  const onSaveHandler = async () => {
    await saveNewPalette();
    // Save the current Palette data to the database
  }

  const saveNewPalette = async () => {
    const { status } = await axios.put("/api/palette", {
      colors: JSON.stringify(colorData), 
      name: paletteName
    });

    if(status === 200) {
      toast.success('New Palette Saved successfully!')
    } else {
      toast.error(`There was an error with your request please try again!`)
      throw new Error("Error connecting to server");
    }
  }

  const nameChangeHandler = (e:ChangeEvent) => {
    const newName = e.target?.value;
    setPaletteName(newName)
  }


  const onChangeHandler = (id: number, newColor: string) => {
    id = Number(id)
    setColorData((prevItems) => {
      const newItems = prevItems.map((item): IColor => (
        (item.id === id) ? { ...item, color: newColor } : item
      ))
      return newItems;
    })

  }

  return (
    <div>
      <PaletteHeader saveHandler={onSaveHandler} nameChangeHandler={nameChangeHandler}/>
      <ColorPickerContainer>
        {colorPickers}
      </ColorPickerContainer>
    </div>
  )
}

export default PaletteCreator;