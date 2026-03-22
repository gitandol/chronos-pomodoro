import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { DefaultButton } from '../DefaultButton';

export function MainForm() {
  return (
    <form action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          type='text'
          id='taskInput'
          labelText='Task'
          placeholder='Digite algo'
        />
      </div>

      <div className='formRow'>
        <p>O próximo intervalo será de 25min.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
