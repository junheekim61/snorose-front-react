import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { deleteExamReview, getReviewDetail, updatePoint } from '@/apis';

import { useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';
import { ReviewContentItem } from '@/components/ReviewContentItem';
import { ReviewDownload } from '@/components/ReviewDownload';

import { dateFormat } from '@/utils/formatDate.js';
import { convertToObject } from '@/utils/convertDS.js';

import {
  COURSE_CATEGORY,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  SEMESTERS,
  TEST_CATEGORY,
  TOAST,
} from '@/constants';

import styles from './ExamReviewDetailPage.module.css';

const COURSE_TYPE = convertToObject(COURSE_CATEGORY);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(TEST_CATEGORY);

export default function ExamReviewDetailPage() {
  const { postId } = useParams();
  const { toast } = useToast();
  const { data } = useQuery({
    queryKey: ['reviewDetail', postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteReview = useMutation({
    mutationFn: () => deleteExamReview(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewList']);
      queryClient.removeQueries(['reviewDetail', postId]);
      queryClient.removeQueries(['reviewFile', postId]);

      updatePoint({
        userId: 62, // userId로 변경 필요
        category: POINT_CATEGORY_ENUM.EXAM_REVIEW_DELETE,
        source: POINT_SOURCE_ENUM.REVIEW,
        sourceId: postId,
      }).then(({ status }) => {
        if (status === 200) {
          toast(TOAST.EXAM_REVIEW_DELETE);
        }
      });
      navigate('/board/exam-review');
    },
  });

  if (data === undefined) return null;

  const {
    scrapCount,
    classNumber,
    online,
    isEdited,
    writer,
    userDisplay,
    title,
    createdAt,
    lectureName,
    professor,
    lectureYear,
    semester,
    lectureType,
    examType,
    fileName,
    questionDetail,
    confirmed,
    isPF,
  } = data;

  return (
    <main>
      <div className={styles.top}>
        <BackAppBar />
        <div className={styles.displayBox}>
          <div className={styles.displayBoxLeft}>
            <Icon
              className={styles.cloudIcon}
              id='cloud'
              width='25'
              height='16'
            />
            <span>{userDisplay}</span>
            <span className={styles.dot}></span>
            <span>{dateFormat(createdAt)}</span>
            {confirmed && (
              <Icon
                className={styles.checkCircleIcon}
                id='check-circle'
                width='15'
                height='15'
              />
            )}
          </div>
          <div className={styles.more}>
            {writer && (
              <>
                <Icon
                  id='pencil'
                  width='15'
                  height='17'
                  onClick={() =>
                    navigate(`/board/exam-review/${postId}/edit`, {
                      state: data,
                      replace: true,
                    })
                  }
                />
                <Icon
                  id='trash'
                  width='12'
                  height='16'
                  onClick={() => deleteReview.mutate()}
                />
              </>
            )}
            <Icon id='ellipsis-vertical' width='3' height='11' />
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>
          <ReviewContentItem tag='강의명' value={lectureName} />
          <ReviewContentItem tag='교수' value={professor} />
          <ReviewContentItem tag='강의 종류' value={COURSE_TYPE[lectureType]} />
          <ReviewContentItem
            tag='수강 학기'
            value={`${lectureYear % 100}-${SEMESTER[semester]}`}
          />
          <ReviewContentItem tag='시험 종류' value={EXAM_TYPE[examType]} />
          <ReviewContentItem tag='P/F 여부' value={isPF ? 'O' : 'X'} />
          <ReviewContentItem tag='시험 유형 및 문항수' value={questionDetail} />
        </div>
        <ReviewDownload className={styles.fileDownload} fileName={fileName} />
      </div>
      <CommentList />
      <InputBar />
    </main>
  );
}
