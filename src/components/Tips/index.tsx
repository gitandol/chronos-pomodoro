import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNetxtCycle } from '../../utils/getNextCycle';
import { getNetxtCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  //ciclos
  const nextCycle = getNetxtCycle(state.currentCycle);
  const nextCycleType = getNetxtCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: `Foque por ${formatSecondsToMinutes(state.config.workTime)}min.`,
    shortBreakTime: `Descanse por ${formatSecondsToMinutes(state.config.shortBreakTime)}min.`,
    longBreakTime: `Descanso longo de ${formatSecondsToMinutes(state.config.longBreakTime)}min.`,
  };

  const tipsForWhenNoActiveTask = {
    workTime: `O próximo ciclo será de ${formatSecondsToMinutes(state.config.workTime)}min.`,
    shortBreakTime: `O próximo descanso será de ${formatSecondsToMinutes(state.config.shortBreakTime)}min.`,
    longBreakTime: `O próximo descanso será longo`,
  };

  return (
    <>
      {state.activeTask
        ? tipsForWhenActiveTask[state.activeTask.type]
        : tipsForWhenNoActiveTask[nextCycleType]}
    </>
  );
}
