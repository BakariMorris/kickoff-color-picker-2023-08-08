'use client';

import { ChangeEvent, MouseEventHandler, ReactNode, useEffect,MouseEvent, useState } from 'react';
import ColorPicker from '@/components/ColorPicker/index';
import axios from 'axios';
import PaletteHeader from './header';
import toast from 'react-hot-toast';
import { ColorPickerContainer } from './styles';

interface IColor {
  key: number,
  color: string,
}

const PaletteCreator = () => {
  const [colorPickerData, setColorPickerData] = useState<Array<IColor>>([]);
  const [paletteName, setPaletteName] = useState<string>('NoName');

  const defaultPalette = [{color:'#01161E'}, {color:'#124559'}, {color:'#598392'}, {color:'#AEC3B0'}, {color:'#EFF6E0'}];
  
  const setColorPickerColors:any = (palette=defaultPalette) => {
    const newPalettes:Array<IColor> = [];
    for (let i = 0; i < 5; i++) {
      newPalettes.push({key: i, color: palette[i].color});
    }
    
    setColorPickerData(newPalettes);
  }

  useEffect(() => {
    setColorPickerColors();
  }, []);

  const saveNewPalette = async ():Promise<void> => {
    const colorData = colorPickerData.map((colorPicker:IColor) => ({id: colorPicker.key, color: colorPicker.color, name: paletteName}))

    const { status } = await axios.put("/api/palette/setPalettes/route", {
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
  
  const nameChangeHandler = (e:any) => {
    const newName = e.target?.value;
    setPaletteName(newName)
  }

  const onChangeHandler = (id: number, newColor: string) => {
    setColorPickerData((prevItems) => {
      const newItems = prevItems.map(
          (item):IColor => (
            (item.key == id) ? {...item, color: newColor} : item)
          )

      return newItems;
    })
  };


  const renderColorPickers = ():Array<ReactNode> => {
    const res = [];
    for(let colorPicker of colorPickerData) {
      res.push(<ColorPicker onChange={onChangeHandler} key={colorPicker.key} dataKey={colorPicker.key} color={colorPicker.color} />)
    }

    return res;
  }


  return (
    <div>
      <PaletteHeader saveHandler={saveNewPalette} nameChangeHandler={nameChangeHandler} setColorPickers={setColorPickerColors}/>
      <ColorPickerContainer>
        {renderColorPickers()}
      </ColorPickerContainer>
    </div>
  )
}

export default PaletteCreator;