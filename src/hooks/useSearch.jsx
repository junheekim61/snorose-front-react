import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchByBoard } from '@/apis';

import { useInfiniteScroll } from '@/hooks';

import { BOARD_ID } from '@/constants';

export default function useSearch({ urlKeyword, filterOption }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const boardType = pathname.split('/')[2];

  const [keyword, setKeyword] = useState(urlKeyword ?? '');
  const [newUrlKeyword, setNewUrlKeyword] = useState(keyword ?? '');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const hadleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/board/${boardType}/search/${encodeURIComponent(keyword)}`);
      setNewUrlKeyword(encodeURIComponent(keyword));
    }
  };

  const { data, ref, isLoading, isFetching, status, isError, error } =
    useInfiniteScroll({
      queryKey: ['search', newUrlKeyword, boardType, filterOption],
      queryFn: ({ pageParam }) =>
        searchByBoard({
          boardId: BOARD_ID[boardType],
          boardType,
          page: pageParam,
          keyword,
          ...filterOption,
        }),
    });

  return {
    data,
    ref,
    isLoading,
    isFetching,
    status,
    isError,
    error,
    keyword,
    urlKeyword,
    handleChange,
    hadleOnKeyDown,
  };
}
