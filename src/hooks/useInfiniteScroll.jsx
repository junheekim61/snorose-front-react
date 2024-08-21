import { useInfiniteQuery } from '@tanstack/react-query';

import { useIntersect } from '@/hooks';

import { Target } from '@/components/Target';

export default function useInfiniteScroll({ queryKey, queryFn }) {
  const { data, hasNextPage, isFetching, status, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        // 마지막 페이지에 대한 값이 없어 임의로 설정
        if (lastPage?.length < 10) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { threshold: 0.8 }
  );

  return { data, isFetching, status, ref, Target };
}
