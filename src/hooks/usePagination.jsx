import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function usePagination({ queryKey, queryFn, enabled }) {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetching,
    status,
    isError,
    error,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage?.hasNext) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    enabled,
  });

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return { data, isLoading, isFetching, status, isError, error, refetch, ref };
}
