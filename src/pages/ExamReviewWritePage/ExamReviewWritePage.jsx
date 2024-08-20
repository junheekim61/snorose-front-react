import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postExamReview, updatePoint } from '@/apis';

import { useToast } from '@/hooks';

import { ActionButton, CloseAppBar } from '@/components/AppBar';
import {
  CategoryButton,
  CategoryFieldset,
  Dropdown,
} from '@/components/Fieldset';
import { Icon } from '@/components/Icon';
import { InputItem, InputList } from '@/components/Input';
import { Textarea } from '@/components/Fieldset';

import {
  CLASS_NUMBER,
  COURSE_CATEGORY,
  POINT_CATEGORY_ENUM,
  POINT_SOURCE_ENUM,
  SEMESTERS,
  TEST_CATEGORY,
  TOAST,
  YEARS,
} from '@/constants';

import styles from './ExamReviewWritePage.module.css';

const FILE_MAX_SIZE = 1024 * 1024 * 10;

export default function ExamReviewWritePage() {
  const { toast } = useToast();
  const [lectureName, setLectureName] = useState('');
  const [professor, setProfessor] = useState('');
  const [lectureType, setLectureType] = useState({});
  const [examType, setExamType] = useState({});
  const [lectureYear, setLectureYear] = useState({});
  const [semester, setSemester] = useState({});
  const [isPF, setIsPF] = useState(false);
  const [classNumber, setClassNumber] = useState({});
  const [questionDetail, setQuestionDetail] = useState('');
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const pass =
    lectureName &&
    professor &&
    lectureType &&
    examType &&
    lectureYear &&
    semester &&
    classNumber &&
    file;

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    event.target.value = '';

    if (selectedFile?.size > FILE_MAX_SIZE) {
      alert('파일은 최대 10MB까지 업로드 할 수 있습니다.');
      return;
    }
    setFile(selectedFile);
  };

  const data = {
    isPF,
    boardId: 32,
    classNumber: classNumber?.id,
    lectureName,
    professor,
    semester: semester?.id,
    lectureType: lectureType?.id,
    examType: examType?.id,
    lectureYear: lectureYear?.id,
    title: '자료구조',
    questionDetail,
    isOnline: false,
    category: 'testCategory',
    content: '',
  };

  return (
    <main className={styles.main}>
      <CloseAppBar>
        <ActionButton
          onClick={() => {
            if (pass) {
              postExamReview({ data, file }).then(({ status, data }) => {
                if (status === 201) {
                  updatePoint({
                    userId: 62, // userId로 교체해야합니다.
                    category: POINT_CATEGORY_ENUM.EXAM_REVIEW_CREATE,
                    source: POINT_SOURCE_ENUM.REVIEW,
                    sourceId: data.result.postId,
                  }).then(({ status }) => {
                    if (status === 200) {
                      toast(TOAST.EXAM_REVIEW_CREATE);
                    }
                  });
                  navigate('/board/exam-review');
                }
              });
            } else {
              alert('필수 입력을 모두 작성해주세요');
            }
          }}
        >
          게시
        </ActionButton>
      </CloseAppBar>
      <InputList>
        <InputItem
          tag='강의명'
          value={lectureName}
          placeholder='강의명을 입력하세요'
          setFn={setLectureName}
        />
        <InputItem
          tag='교수명'
          value={professor}
          placeholder='교수명을 입력하세요'
          setFn={setProfessor}
        />
      </InputList>
      <CategoryFieldset title='강의 종류' required>
        {COURSE_CATEGORY.map((option) => (
          <CategoryButton
            key={option.id}
            select={lectureType}
            option={option}
            callback={setLectureType}
          >
            {option.name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='시험 종류' required>
        {TEST_CATEGORY.map((option) => (
          <CategoryButton
            key={option.id}
            select={examType}
            option={option}
            callback={setExamType}
          >
            {option.name}
          </CategoryButton>
        ))}
      </CategoryFieldset>
      <CategoryFieldset title='수강 연도' required>
        <Dropdown
          options={YEARS}
          select={lectureYear}
          setFn={setLectureYear}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='수강 학기' required>
        <Dropdown
          options={SEMESTERS}
          select={semester}
          setFn={setSemester}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset
        title='P/F 여부'
        required
        hasCheckbox
        value={isPF}
        setFn={setIsPF}
      />
      <CategoryFieldset title='수강 분반' required>
        <Dropdown
          options={CLASS_NUMBER}
          select={classNumber}
          setFn={setClassNumber}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
      <CategoryFieldset title='시험 유형 및 설명'>
        <Textarea
          value={questionDetail}
          setFn={setQuestionDetail}
          placeholder='강의 시험 유형 및 부가적인 설명을 기술해주세요'
          minRows='5'
          maxRows='10'
        />
      </CategoryFieldset>
      <div className={styles.file}>
        <div className={styles.left}>
          <Icon id='clip-board-list-blue' width={18} height={19} />
          <span className={styles.tag}>첨부파일</span>
        </div>
        <div className={styles.right}>
          <label htmlFor='file'>{file?.name ?? '첨부된 파일이 없어요'}</label>
          <input id='file' type='file' accept='.pdf' onChange={handleFile} />
        </div>
      </div>
    </main>
  );
}
