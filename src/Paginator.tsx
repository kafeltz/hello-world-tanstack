import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { listPokemons } from './api/pokemon'

import './App.css';
import { PokemonApiResult } from './api/types';

import { useIsFetching } from '@tanstack/react-query'

import Pagination from './components/Pagination';

const limit = 5;

function Paginator() {
  const isFetching = useIsFetching();
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, isError, data, error, isPlaceholderData } = useQuery<PokemonApiResult>({
    queryKey: ['pokemon-list', { currentPage, limit }],
    // queryFn: () => Promise.resolve(5),
    // select: (data) => data.toString(),
    queryFn: async () => await listPokemons(currentPage, limit),
  });

  const handleOnChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  }

  return (
    <>
      {isFetching === 1 && <div className="GlobalLoading"></div>}

      <div className="App">
        <header className="App-header">
          <h1>Pokemon list</h1>
        </header>

        <div className="content">
          {isPending && <span>Loading...</span>}
          {isError && <span>Error: {error.message}</span>}

          <ul>
            {data?.results.map(p => <li key={`p-name-${p.name}`}>{p.name}</li>)}
          </ul>
        </div>

        <Pagination total={data?.count} limit={50} onChange={handleOnChange} current={currentPage} />
      </div>
    </>
  );
}

export default Paginator;
