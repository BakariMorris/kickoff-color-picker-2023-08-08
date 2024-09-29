import axios from 'axios';
import { ChangeEvent, ChangeEventHandler, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DarkInput, HeaderButton, HeaderContainer, Sheet } from './styles';


interface PropTypes {
  saveHandler: MouseEventHandler,
  nameChangeHandler: ChangeEventHandler
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


const PaletteHeader = (props: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [palettes, setPalettes] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [saveCounter, setSaveCounter] = useState<number>(0);

  useEffect(() => {
    const getPalettes = async () => {
      const rows = await getPallets()

      setPalettes(rows);
    }

    getPalettes()
  }, [saveCounter]);



  const searchForPalette = async (e:SubmitEvent) => {
    e.preventDefault();
    const { status, data } = await axios.get(`/api/palette/search/route?searchTerm=${searchTerm}`);
    if(status === 200)
      toast.success(`Search successful!`)
    
    if(data.length) {
      toast.success(`At least one palette was found!`);
    } else {
      
      toast.error(`No palettes found!`);
    }
  }

  const searchOnChangeHandler:ChangeEventHandler = async (e:ChangeEvent) => {
    setSearchTerm(e.target?.value);
  }

  const saveHandler = (e: MouseEvent) => {
    setSaveCounter(prev => prev += 1)
    props.saveHandler(e);
  }

  const createPaletteBlocks = (colorObjects, id) => {
    return (
      <li key={id} style={{ display: 'flex', marginBottom: '20px' }}>
        {colorObjects.map((colorObj) => {
          return (<div style={{
            backgroundColor: colorObj.color,
            height: '50px',
            width: '50px'
          }} key={colorObj.id}></div>)
        })}
      </li>
    )
  }

  return (
    <HeaderContainer>
      <DarkInput onChange={props.nameChangeHandler} type='text' placeholder='Palette Name' />
      <form onSubmit={searchForPalette}>
        <DarkInput onChange={searchOnChangeHandler}  type='text' placeholder='Search here' />
      </form>

      <HeaderButton onClick={saveHandler}>Save Palette Data</HeaderButton>
      <HeaderButton onClick={() => setIsOpen((prevState) => !prevState)}>Show Palettes</HeaderButton>
      <Sheet style={{ transform: (isOpen) ? 'translateX(0)' : 'translateX(100%)' }}>
        <ul>
          {palettes.map((item) => {
            let colorObjects = JSON.parse(item.colors)

            return (
              <div>
                <p>{item.name}</p>
                {createPaletteBlocks(colorObjects, item.id)}
              </div>
            )
          })
          }
        </ul>
      </Sheet>
    </HeaderContainer>
  );
}

export default PaletteHeader;