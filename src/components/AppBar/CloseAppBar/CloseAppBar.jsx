import { useNavigate } from 'react-router-dom';
import Icon from '../../Icon/Icon.jsx';
import styles from './CloseAppBar.module.css';

export default function CloseAppBar({ alignRight, children }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.appBar}
      style={{ justifyContent: `${alignRight ? 'flex-end' : 'space-between'}` }}
    >
      <Icon
        className={styles.close}
        id='close'
        width={31}
        height={31}
        onClick={() => navigate(-1)}
      />
      <div className={styles.actions}>{children}</div>
    </div>
  );
}