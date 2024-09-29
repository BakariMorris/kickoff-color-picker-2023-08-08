import axios from 'axios';
import { ChangeEvent, ChangeEventHandler, EventHandler, MouseEvent, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DarkInput, HeaderButton, HeaderContainer, PaletteContainer, SearchResultHeader, Sheet } from './styles';


interface PropTypes {
  saveHandler: MouseEventHandler,
  nameChangeHandler: ChangeEventHandler,
  setColorPickers: MouseEventHandler,
}



const PaletteHeader = (props: PropTypes) => {
  const [isOpen, setIsOpen] = useState(true);
  const [palettes, setPalettes] = useState([]);
  const [saveCounter, setSaveCounter] = useState<number>(0);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [foundPalettes, setFoundPalettes] = useState<Array<ReactNode>>([]);

  const { setColorPickers } = props;

  useEffect(() => {
    const getPalettes = async () => {
      const rows = await getPallets()

      const newPalettes = rows.map((row:any) => (
        { id: row.id, name: row.name, colors: JSON.parse(row.colors) }
      ))

      setPalettes(newPalettes);
    }

    getPalettes()
  }, [saveCounter]);


  const searchForPalette:any = async (e: SubmitEvent) => {
    e.preventDefault();

    const { status, data } = await axios.get(`/api/palette/search/route?searchTerm=${searchTerm}`);

    if (status === 200)
    if (data.length) {
      toast.success(`Palettes found! Check the side bar for your new palettes!`);
      const newFoundPalettes = data.map(
        (palette:any) => (
          { id: palette.id, name: palette.name, colors: JSON.parse(palette.colors) }
        )) 
      
      setFoundPalettes((prevPalettes) => [...prevPalettes, ...newFoundPalettes])
    } else {
      toast.error(`No palettes found!`);
    }
  }

  const getPallets = async () => {
    const { status, data } = await axios.get("/api/palette/getPalettes/route");

    if (status === 200) {
      toast.success(`Palette's fetched successfully!`);
      return data;
    }

    toast.success(`Palette's failed to load :(`);
    throw new Error('Something went wrong with this request')
  }

  const saveHandler = (e: MouseEvent) => {
    setSaveCounter(prev => prev += 1)
    props.saveHandler(e);
  }

  const clickedPaletteHandler: MouseEventHandler = (e: MouseEvent) => {
    const targetIndex = e.currentTarget.getAttribute('data-key');
    //Change palettes to object and efficiently search for id
    const targetPalette:any = palettes.find((palette:any) => palette.id == targetIndex)
    setColorPickers(targetPalette.colors)
  }

  const renderPaletteBlocks = (palette:any) => {
    return (
      <PaletteContainer onClick={clickedPaletteHandler} key={palette.id} data-key={palette.id}>
        <p>{palette.name}</p>
        <ul style={{ display: 'flex', marginBottom: '20px' }}>
          {palette.colors.map((colorObj:any) => {
            return (<li style={{
              backgroundColor: colorObj.color,
              height: '50px',
              width: '50px'
            }} key={colorObj.id}></li>)
          })}
        </ul>
      </PaletteContainer>
    )
  }

  const renderPalettes = (): Array<ReactNode> => {
    console.log()
    return palettes.map((palette) => {
      return (
        <div>
          {renderPaletteBlocks(palette)}
        </div>
      )
    })
  }

  const renderFoundPalettes = ():ReactNode => {
    const newPalettes = foundPalettes.map((palette) => (
      renderPaletteBlocks(palette)
    ));

    if (foundPalettes.length > 0) {
      return (
        <>
        <hr></hr>
          <SearchResultHeader>Found Palettes</SearchResultHeader>
          <div>
            {newPalettes}
          </div>
        </>
      )
    }

    return <></>;

  }

  return (
    <HeaderContainer>
      <DarkInput onChange={props.nameChangeHandler} type='text' placeholder='Palette Name' />
      <form onSubmit={searchForPalette}>
        <DarkInput
          onChange={(e:any) => setSearchTerm(e.target?.value)}
          type='text'
          placeholder='Search here' />
      </form>

      <HeaderButton onClick={saveHandler}>Save Palette Data</HeaderButton>
      <HeaderButton onClick={() => setIsOpen((prevState) => !prevState)}>Toggle Sheet</HeaderButton>
      <Sheet style={{ transform: (isOpen) ? 'translateX(0)' : 'translateX(100%)' }}>
        <ul>
          {renderPalettes()}
        </ul>

        <div>
          <ul>
            {renderFoundPalettes()}
          </ul>
        </div>
      </Sheet>
    </HeaderContainer>
  );
}

export default PaletteHeader;