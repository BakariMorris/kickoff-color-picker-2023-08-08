import styled from 'styled-components';

export const ColorPickerContainer = styled.div`
display: flex;
justify-content: center;
align-items: end;
height: 95vh;
width: calc(100vw/5);
position: relative;
`;

export const ColorInput = styled.input`
padding: 8px;
font-size: 24px;
font-weight: 700;
border: none;
background-color: transparent;
cursor: pointer;
height: 100px;
width: 150px;
margin-bottom: 70px;
`;

export const SelectingCanvas = styled.canvas`
position: absolute;
bottom: 230px;
padding: 8px;
background-color: white;
max-width: 100%;
`;