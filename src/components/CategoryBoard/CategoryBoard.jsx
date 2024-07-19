import { Link } from 'react-router-dom';
import CategoryBoardItem from './CategoryBoardItem.jsx';
import CategoryBoardItemDetail from './CategoryBoardItemDetail.jsx';
import styles from './CategoryBoard.module.css';

function CategoryBoardMain({ title, children }) {
  return (
    <article className={styles.board}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link to='/' className={styles.more}>
          더보기
        </Link>
      </div>
      <ul className={styles.list}>{children}</ul>
    </article>
  );
}

const CategoryBoard = Object.assign(CategoryBoardMain, {
  Item: CategoryBoardItem,
  DetailItem: CategoryBoardItemDetail,
});

export default CategoryBoard;
