import styles from './EditInfoPage.module.css';
import { useEffect, useState } from 'react';
import { Icon } from '../../../components/Icon';
import { BackAppBar, ActionButton } from '../../../components/AppBar';
import { CategoryFieldset, Dropdown } from '../../../components/Fieldset';
import { MAJORS } from '../../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/apis';
import { useAuth } from '@/hooks';

export default function EditInfoPage() {
  const { userInfo, status } = useAuth({
    isRequiredAuth: true,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [major, setMajor] = useState({});
  const [nameError, setNameError] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
  const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;

  const queryClient = useQueryClient();

  const {
    mutate: updateUserInfoMutate,
    error: updateUserInfoError,
    isPending: isUpdateUserInfoPending,
    isError: isUpdateUserInfoError,
    isSuccess: isUpdateUserInfoSuccess,
  } = useMutation({
    mutationKey: ['updateUserInfo'],
    mutationFn: (body) => updateUserInfo(body),
  });

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (
      specialCharRegex.test(value) ||
      emojiRegex.test(value) ||
      /\s/.test(value)
    ) {
      setNameError('특수문자와 띄어쓰기는 사용할 수 없습니다');
    } else {
      setNameError('');
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    if (
      specialCharRegex.test(value) ||
      emojiRegex.test(value) ||
      /\s/.test(value)
    ) {
      setNicknameError('특수문자와 띄어쓰기는 사용할 수 없습니다');
    } else {
      setNicknameError('');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleBirthDateChange = (e) => {
    const input = e.target;
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    input.value = value;

    if (value.length === 8) {
      const year = parseInt(value.slice(0, 4), 10);
      const month = parseInt(value.slice(4, 6), 10);
      const day = parseInt(value.slice(6, 8), 10);

      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
      ) {
        setBirthDateError('유효하지 않은 생년월일입니다.');
      } else {
        setBirthDateError('');
      }
    } else if (value.length > 0 && value.length < 8) {
      setBirthDateError(
        '생년월일 형식이 올바르지 않습니다. YYYYMMDD 형식으로 입력해주세요.'
      );
    } else {
      setBirthDateError('');
    }

    setBirthDate(e.target.value);
  };

  const handleSubmitButtonClick = () => {
    const [year, month, day] = [
      birthDate.slice(0, 4),
      birthDate.slice(4, 6),
      birthDate.slice(6, 8),
    ];

    updateUserInfoMutate({
      userName: name,
      birthday: `${year}-${month}-${day}`,
      nickname,
      userProfile: profileImage || undefined,
      major: major.name || undefined,
    });
  };

  useEffect(() => {
    if (userInfo === null) {
      return;
    }

    const { userProfile, userName, birthday, nickname, major } = userInfo;

    setProfileImage(userProfile);
    setName(userName);
    setBirthDate(birthday.replaceAll('-', ''));
    setNickname(nickname);
    setMajor({
      id: major,
      name: major,
    });
  }, [userInfo]);

  useEffect(() => {
    if (isUpdateUserInfoSuccess) {
      alert('회원 정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['myPageUserInfo'],
      });

      return;
    }

    if (isUpdateUserInfoError) {
      alert(
        updateUserInfoError.response.data.userProfile ||
          updateUserInfoError.response.data.userName ||
          updateUserInfoError.response.data.birthday ||
          updateUserInfoError.response.data.nickname ||
          updateUserInfoError.response.data.major
      );
    }
  }, [
    queryClient,
    isUpdateUserInfoSuccess,
    isUpdateUserInfoError,
    updateUserInfoError,
  ]);

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className={styles.editInfoPage}>
      <header className={styles.topContainer}>
        <div>
          <BackAppBar />
        </div>
        <div className={styles.submitBtn}>
          <ActionButton
            type='button'
            disabled={isUpdateUserInfoPending}
            onClick={handleSubmitButtonClick}
          >
            완료
          </ActionButton>
        </div>
      </header>

      <section className={styles.profileContainer}>
        <div className={styles.profileImgContainer}>
          <div
            className={styles.profileImg}
            onClick={() => document.getElementById('profileImageInput').click()}
          >
            {profileImage !== null ? (
              <img
                src={profileImage}
                alt='프로필'
                className={styles.profilePreview}
              />
            ) : (
              <Icon id='profile-basic-camera' />
            )}
          </div>
          <input
            type='file'
            id='profileImageInput'
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleProfileImageChange}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>이름</h3>
            <div
              className={`${styles.inputWrapper} ${nameError ? styles.errorInputWrapper : ''}`}
            >
              <input
                type='text'
                className={`${styles.inputText} ${nameError ? styles.errorInputText : ''}`}
                placeholder='이름을 입력하세요'
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
          </div>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>생년월일</h3>
            <div
              className={`${styles.inputWrapper} ${birthDateError ? styles.errorInputWrapper : ''}`}
            >
              <input
                type='text'
                className={styles.inputText}
                placeholder='20020101'
                maxLength={12}
                value={birthDate.replaceAll('-', '')}
                onChange={handleBirthDateChange}
                pattern='\d{4}\.\d{2}\.\d{2}'
                title='형식: YYYYMMDD (예: 20020101)'
              />
            </div>
            {birthDateError && (
              <p className={styles.errorMessage}>{birthDateError}</p>
            )}
          </div>
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>닉네임</h3>
            <div
              className={`${styles.inputWrapper} ${nicknameError ? styles.errorInputWrapper : ''}`}
            >
              <input
                type='text'
                className={`${styles.inputText} ${nicknameError ? styles.errorInputText : ''}`}
                placeholder='닉네임을 입력하세요'
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            {nicknameError && (
              <p className={styles.errorMessage}>{nicknameError}</p>
            )}
          </div>
        </div>
      </section>
      <CategoryFieldset title='전공' required>
        <Dropdown
          options={MAJORS}
          select={major}
          setFn={setMajor}
          placeholder='선택하세요'
        />
      </CategoryFieldset>
    </main>
  );
}
