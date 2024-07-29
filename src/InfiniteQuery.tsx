import React, { useState } from 'react';
import { listPokemons } from './api/pokemon'
import { useInfiniteQuery } from '@tanstack/react-query'


export default function InfiniteQuery() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchProjects = async (pageParam: any) => {

    console.log(pageParam.pageParam);

    return await listPokemons(pageParam.pageParam, limit);
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemons-infinity-list'],
    queryFn: fetchProjects,
    initialPageParam: 1,
    // getNextPageParam: (lastPage, pages) => lastPage.next,
    // getPreviousPageParam: (firstPage, pages) => firstPage.previous,
    getNextPageParam: (lastPage, allPages, lastPageParam: number) => {
      if (lastPage.results.length === 0) {
        return 1;
      }

      return lastPageParam + 1;
    },
    maxPages: 3,
  })

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Infinite Query</h1>
        </header>

        <div className="content">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.results.map((pokemon) => (
                <p key={pokemon.name}>{pokemon.name}</p>
              ))}
            </React.Fragment>
          ))}
        </div>

        <>
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
        </div>

      </>
      )
}