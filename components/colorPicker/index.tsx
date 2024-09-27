'use client';

import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import ColorPickerLogic from "./logic";


const ColorPicker = (): ReactNode => {



  return (
    <section className="flex justify-center items-center">
      <ColorPickerLogic onChange={(color:string) => console.log(color)} />
    </section>
  );

}

export default ColorPicker;

/*
  How to create a pallete, can be a colleciton of color pickers that all relate to their own squares of the pallete?
  We should have one way data binding right?
*/