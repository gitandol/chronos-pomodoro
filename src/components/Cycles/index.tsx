import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNetxtCycle } from '../../utils/getNextCycle';
import { getNetxtCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cyclesStep = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cyclesStep.map((_, index) => {
          const nextCycle = getNetxtCycle(index);
          const nextCycleType = getNetxtCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
