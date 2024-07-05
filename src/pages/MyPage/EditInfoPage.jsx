import React from 'react';
import styles from './EditInfoPage.module.css';
import arrowBackIcon from '../../assets/icon-arrow-back.svg';
import profileIcon from '../../assets/icon-profile.svg';
import calendarIcon from '../../assets/icon-calendar.svg';
import { useNavigate } from 'react-router-dom';

export default function EditInfoPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/my-page');
  };

  return (
    <main className={styles.EditInfoPage}>
      <div className={styles.topContainer}>
        <div className={styles.goBackBtn} onClick={handleGoBack}>
          <img src={arrowBackIcon} alt='뒤로가기' />
        </div>
        <p className={styles.completionBtn}>완료</p>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileImg}>
          <img src={profileIcon} alt='프로필 이미지' />
        </div>
        <p className={styles.profileEditBtn}>프로필 변경</p>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.Info}>
          <p className={styles.title}>이름</p>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>이숙명</p>
          </div>
        </div>
        <div className={styles.Info}>
          <p className={styles.title}>생일</p>
          <div className={`${styles.inputBox} ${styles.calendarInput}`}>
            <div className={styles.calendarContainer}>
              <img src={calendarIcon} alt='달력 아이콘' />
            </div>
            <p className={styles.inputText}>1996.01.01</p>
          </div>
        </div>
        <div className={styles.Info}>
          <p className={styles.title}>닉네임</p>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>담두라</p>
          </div>
        </div>
        <div className={styles.Info}>
          <p className={styles.title}>전공</p>
          <div className={styles.inputBox}>
            <p className={styles.inputText}>시각영상디자인과</p>
          </div>
        </div>
      </div>
    </main>
  );
}
