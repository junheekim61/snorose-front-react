import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import { deleteExamReview, getReviewDetail, updatePoint } from '@/apis';

import { useScrap } from '@/hooks';
import { useToast } from '@/hooks';

import { BackAppBar } from '@/components/AppBar';
import { CommentList } from '@/components/Comment';
import { DeleteModal, OptionModal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { InputBar } from '@/components/InputBar';
import { ReviewContentItem } from '@/components/ReviewContentItem';
import { ReviewDownload } from '@/components/ReviewDownload';

import { dateFormat } from '@/utils/date.js';
import { convertToObject } from '@/utils/convertDS.js';

import {
  LECTURE_TYPES,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  SEMESTERS,
  EXAM_TYPES,
  TOAST,
} from '@/constants';

import { USER } from '@/dummy/data';

import styles from './ExamReviewDetailPage.module.css';

const COURSE_TYPE = convertToObject(LECTURE_TYPES);
const SEMESTER = convertToObject(SEMESTERS);
const EXAM_TYPE = convertToObject(EXAM_TYPES);

export default function ExamReviewDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['reviewDetail', postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  const losePoint = useMutation({
    mutationFn: () =>
      updatePoint({
        userId: USER.userId, // userId로 교체해야합니다.
        category: POINT_CATEGORY_ENUM.EXAM_REVIEW_DELETE,
        source: POINT_SOURCE_ENUM.REVIEW,
        sourceId: postId,
      }),
    onSuccess: () => {
      toast(TOAST.EXAM_REVIEW.delete);
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const deleteReview = useMutation({
    mutationFn: () => deleteExamReview(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewList']);
      queryClient.removeQueries(['reviewDetail', postId]);
      queryClient.removeQueries(['reviewFile', postId]);

      navigate('/board/exam-review', { replace: true });
      losePoint.mutate();
    },
    onError: ({ response }) => {
      toast(response.data.message);
    },
  });

  const { scrap, deleteScrap } = useScrap();
  const { toast } = useToast();

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (data === undefined) return null;

  const edit = () =>
    navigate(`/board/exam-review/${postId}/edit`, {
      state: data,
      replace: true,
    });
  const remove = () => deleteReview.mutate();

  const {
    commentCount,
    createdAt,
    examType,
    fileName,
    isConfirmed,
    isEdited,
    isPF,
    isScrapped,
    isWriter,
    lectureName,
    lectureType,
    lectureYear,
    professor,
    questionDetail,
    scrapCount,
    semester,
    title,
    userDisplay,
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
            {isEdited && <span>&nbsp;(수정됨)</span>}
            {isConfirmed && (
              <Icon
                className={styles.checkCircleIcon}
                id='check-circle'
                width='15'
                height='15'
              />
            )}
          </div>
          {isWriter && (
            <Icon
              onClick={() => setIsOptionModalOpen(true)}
              id='ellipsis-vertical'
              width='3'
              height='11'
              style={{ padding: '0 4px', cursor: 'pointer' }}
            />
          )}
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
        <div className={styles.actions}>
          <div className={styles.action}>
            <Icon
              className={styles.comment}
              id='comment'
              width='15'
              height='14'
              fill='#D9D9D9'
            />
            <span>{commentCount.toLocaleString()}</span>
          </div>
          <div
            className={styles.action}
            onClick={() => (isScrapped ? deleteScrap.mutate() : scrap.mutate())}
          >
            <Icon
              id='bookmark-fill'
              width='10'
              height='13'
              fill={isScrapped ? '#5F86BF' : '#D9D9D9'}
            />
            <span>{scrapCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <CommentList commentCount={commentCount} />
      <InputBar />
      <OptionModal
        id='exam-review-edit'
        isOpen={isOptionModalOpen}
        setIsOpen={setIsOptionModalOpen}
        closeFn={() => setIsOptionModalOpen(false)}
        functions={{
          pencil: edit,
          trash: () => {
            setIsOptionModalOpen(false);
            setIsDeleteModalOpen(true);
          },
        }}
      />
      <DeleteModal
        id='exam-review-delete'
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={remove}
      />
    </main>
  );
}
