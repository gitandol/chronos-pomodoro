import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { DefaultButton } from '../DefaultButton';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNetxtCycle } from '../../utils/getNextCycle';
import { getNetxtCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  // const [taskName, setTaskName] = useState(''); // Controlada: Renderiza enquanto digita
  const taskNameInput = useRef<HTMLInputElement>(null); // Não controlada: Acessa o valor apenas no submit

  //ciclos
  const nextCycle = getNetxtCycle(state.currentCycle);
  const nextCycleType = getNetxtCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim(); // Acessa o valor do input e remove espaços em branco
    console.log(taskName);

    if (!taskName) {
      alert('Digite algo para criar uma tarefa!');
      taskNameInput.current.value = ''; // Limpa o input
      return;
    }

    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
    if (!state.activeTask) return;

    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (task.id === prevState.activeTask?.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          type='text'
          id='taskInput'
          labelText='Task'
          placeholder='Digite algo'
          //value={taskName}
          //onChange={e => setTaskName(e.target.value)}
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>O próximo intervalo será de 25min.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='botao_submit'
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            color='red'
            aria-label='Interromper tarefa'
            title='Interromper tarefa'
            type='button'
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
            key='botao_button'
          />
        )}
      </div>
    </form>
  );
}
