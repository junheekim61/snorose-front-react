const TOAST = Object.freeze({
  ATTENDANCE: {
    attendance: '출석체크 완료',
  },
  EXAM_REVIEW: {
    validate: '필수 입력을 모두 작성해주세요',
    create: '100P 적립이 완료되었어요',
    delete: '100P 차감되었어요',
    edit: '시험후기 수정 완료',
    download: '50P 차감되었어요',
  },
  POST: {
    create: '2P 적립이 완료되었어요',
    delete: '게시글이 삭제되었습니다.',
    edit: '게시글 수정 완료',
    emptyTitle: '제목을 입력하세요.',
    emptyContent: '내용을 입력하세요.',
    emptyBoard: '게시판을 선택하세요.',
  },
  COMMENT: {
    create: '댓글 등록 성공!',
    delete: '댓글이 삭제되었습니다.',
    edit: '댓글 수정 완료',
  },
  USER: {
    editPassword: '비밀번호 수정이 완료되었습니다.',
    editUserInfo: '회원 정보 수정이 완료되었습니다.',
    withdraw: '회원 탈퇴가 완료되었습니다.',
  },
  LOGIN: {
    loginFailure: '아이디 혹은 비밀번호가 일치하지 않습니다.',
  },
  VERIFY: {
    notCompleted: '모두 입력해주세요',
    invalidEmail: '올바른 이메일을 입력해주세요',
  },
  SERVER_ERROR: {
    500: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요',
  },
});

export { TOAST };
