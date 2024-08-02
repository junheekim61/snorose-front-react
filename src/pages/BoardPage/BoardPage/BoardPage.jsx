import styles from './BoardPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import Sponser from '../../../components/Sponser/Sponser.jsx';
import Sidebar from '../../../components/Sidebar/Sidebar';
import BoardBar from '../../../components/BoardBar/BoardBar.jsx';
import Header from '../../../components/Header/Header.jsx';
import { BOARD_MENUS } from '../../../constants';
import { useState } from 'react';

export default function BoardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.padding_container}>
        <div className={styles.searchbar_box}>
          <div className={styles.searchbar}>
            <Icon id='search-grey' width='14' height='14' fill='#898989' />
            <input type='text' placeholder='전체 게시판 검색' />
          </div>
        </div>
        <div className={styles.board_box}>
          <div className={styles.board_title}>커뮤니티</div>
          <div className={styles.board_list_box}>
            {BOARD_MENUS.map((board, index) => (
              <BoardBar key={index} data={board} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.more_board_box}>
        <div className={styles.icon_logo}>
          <Icon id='icon-logo' />
        </div>
        <p>스노로즈에서 더 다양한 게시판을 준비하고 있어요</p>
      </div>
      <div className={styles.padding_container}>
        <div className={styles.sponser}>
          <Sponser />
        </div>
      </div>
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </div>
  );
}
