import { useState } from 'react';
import { filterDeletedComments } from '../../../utils/filterComment.js';

import { Comment } from '../index.js';
import { FetchLoading } from '../../Loading';

import useComment from '../../../hooks/useComment.jsx';

import styles from './CommentList.module.css';

export default function CommentList() {
  const { commentList } = useComment();

  console.log(commentList);

  if (!commentList) {
    return <FetchLoading>댓글을 불러오는 중...</FetchLoading>;
  }

  const dataList = filterDeletedComments(commentList);

  return (
    <div className={styles.comments}>
      <p className={styles.commentsTitle}>댓글 {commentList?.length}개</p>
      {dataList ? (
        dataList.map((comment) => <Comment key={comment.id} data={comment} />)
      ) : (
        <div className={styles.failComment}>댓글을 불러올 수 없습니다.</div>
      )}
    </div>
  );
}
