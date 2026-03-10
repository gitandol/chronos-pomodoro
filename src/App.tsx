import './styles/theme.css';
import './styles/global.css';

import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Footer } from './components/Footer';
import { Heading } from './components/Heading';
import { useState } from 'react';

export function App() {
  const [numero, setNumero] = useState(() => {
    console.log('Lazy initialization');
    return 0;
  });

  // const [numero, setNumero] = useState(0);

  function handleClick() {
    setNumero(prevState => prevState + 1);
    // setNumero(1);
  }

  return (
    <>
      <Heading> Numero: {numero}</Heading>
      <button onClick={handleClick}>Incrementar</button>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <form action='' className='form'>
          <div className='formRow'>
            <DefaultInput
              type='text'
              id='taskInput'
              labelText={`Task ${numero}`}
              placeholder='Digite algo'
            />
          </div>

          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className='formRow'>
            <Cycles />
          </div>

          <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon />} />
          </div>
        </form>
      </Container>
      <Container>
        {' '}
        <Footer />{' '}
      </Container>
    </>
  );
}
