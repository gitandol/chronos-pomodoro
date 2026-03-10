import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storedTheme;
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      return nextTheme;
    });
  }

  const nextThemeIcon = {
    light: <MoonIcon />,
    dark: <SunIcon />,
  };

  // 1. Sem argumentos,
  // - o useEffect é executado apenas uma vez, após a montagem do componente
  // 2. Com o array de dependências [theme],
  // - o useEffect é executado sempre que o valor de theme muda
  // 3. Com lista vazia [],
  // - o useEffect é executado apenas uma vez, após a montagem do componente,
  // - e não será executado novamente, mesmo que o valor de theme mude
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]); // Atualiza o atributo data-theme do elemento raiz quando o tema muda

  return (
    <nav className={styles.menu}>
      <a
        className={styles.menulink}
        href='#'
        aria-label='Ir para a Home'
        title='Ir para Home'
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menulink}
        href='#'
        aria-label='Ir para o Histórico'
        title='Ir para Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menulink}
        href='#'
        aria-label='Ir para as Configurações'
        title='Ir para Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menulink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
