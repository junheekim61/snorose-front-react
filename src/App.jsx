import { Outlet, useLocation } from 'react-router-dom';
import styles from './App.module.css';

import Navbar from './components/Navbar/Navbar';
const menuWithNoNav = ['/login', '/findId', 'foundId'];

/*function App() {
  return ( 
    <div className={styles.app}>
      <Outlet />
      <Navbar />
    </div>
  );
}*/
function noNav(location) {
  for (let i in menuWithNoNav) {
    if (location === menuWithNoNav[i]) {
      return true;
    }
  }
  return false;
}
function App() {
  let location = useLocation();
  let isNoNav = noNav(location.pathname);
  return (
    <div className={styles.app}>
      <Outlet />
      {isNoNav ? '' : <Navbar />}
    </div>
  );
}

export default App;
