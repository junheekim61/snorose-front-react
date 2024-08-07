import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Icon } from '../../../components/Icon';

import styles from './LoginPage.module.css';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errmsg, setErrmsg] = useState(false);
  const [visBtnClick, setVisBtnClick] = useState(false);
  const toggleVisBtn = () => {
    setVisBtnClick((prev) => !prev);
  };
  const [pwInputFocus, setPwInputFocus] = useState(false);
  const pwInputRef = useRef();
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { loginId: id, password: pw };
    const apiUrl = 'http://13.124.33.41:8081';
    const endpoint = '/v1/users/login';
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post(apiUrl + endpoint, user, {
        headers: headers,
      });
      setUser(response.data);
      setErrmsg(false);
      localStorage.setItem('user', response.data);
      console.log(response.data);
    } catch (e) {
      setErrmsg(true);
    }
  };

  return (
    <div className={styles.loginframe}>
      <form onSubmit={handleSubmit}>
        <div className={styles.prev}>
          <Icon id='arrow-left' width='9' height='14' />
        </div>
        <div className={styles.loginbody}>
          <p className={styles.title}>SNOROSE</p>
          <p>숙명인의 회원 커뮤니티</p>
          <p>스노로즈에 오신 것을 환영합니다</p>
          <input
            type='text'
            placeholder='아이디'
            onChange={(e) => {
              setId(e.target.value);
            }}
            className={styles.idInput}
          />
          <div
            tabIndex='0'
            onFocus={() => setPwInputFocus(true)}
            onBlur={() => {
              setPwInputFocus(false);
              setVisBtnClick(false);
            }}
            className={styles.pwWrapper}
          >
            <input
              type={visBtnClick ? 'text' : 'password'}
              placeholder='영어, 숫자, 특수문자를 포함한 비밀번호'
              onChange={(e) => {
                setPw(e.target.value);
              }}
              className={styles.pwInput}
              ref={pwInputRef}
            />
            <div
              className={styles.pwEyes}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleVisBtn();
                pwInputRef.current.focus();
              }}
              onMouseUp={(event) => {
                //이거 없으면 pwInput input의 type이 바뀔때 커서가 자꾸 앞으로 재조정됨
                event.preventDefault();
              }}
            >
              {pwInputFocus && (
                <Icon
                  id='opened-eye'
                  className={styles.visiblity}
                  width='14'
                  height='10'
                ></Icon>
              )}
            </div>
          </div>
          <button className={styles.button} type='submit'>
            로그인
          </button>
          <div className={styles.find}>
            <Link to='/find-id'>아이디 찾기</Link> |{' '}
            <Link to='/find-pw'>비밀번호 찾기</Link>
          </div>
          <a className={styles.signup}>회원가입</a>
        </div>
        {errmsg && (
          <div className={styles.loginError}>
            <p>아이디 혹은 비밀번호가</p>
            <p>일치하지 않습니다</p>
          </div>
        )}
      </form>
    </div>
  );
}