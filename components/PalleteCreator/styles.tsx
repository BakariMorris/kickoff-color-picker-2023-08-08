import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 16px;
  background-color: rgba(253,242,248,.2);
  display: flex;
`;

export const HeaderButton = styled.button`
  display: block;
  background-color: white;
  color: black;
  padding: 8px;
  margin: 0 8px;
  border-radius: 8px;
  font-weight: 700;
`;

export const Sheet = styled.div`
  position: fixed;
  top: 0;
  right: 0; /* Change this to 'left: 0' to slide from the left */
  height: 100%;
  width: 300px;
  background-color: #3b383a;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(100%); /* Hidden by default */
  transition: transform 0.3s ease;
  padding: 20px;
  z-index: 1000;
`;

export const DarkInput = styled.input`
  color: black;
  margin: 0 8px;
  padding: 8px;
  border-radius: 8px;
`
export const ColorPickerContainer = styled.div`
  display: flex;
`;

export const PaletteContainer = styled.div`
  cursor: pointer;
`

export const SearchResultHeader = styled.h1`
  font-size: 24px;
`;