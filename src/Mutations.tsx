import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { fakeTopPokemonList, listPokemons } from './api/pokemon'

import './App.css';
import { PokemonApiResult, PokemonBasicInfo } from './api/types';

import { useIsFetching } from '@tanstack/react-query'

import Pagination from './components/Pagination';

const limit = 5;

function Mutations() {
  const mutation = useMutation({
    mutationFn: async (newTodo: PokemonBasicInfo) => {
      // fake network delay
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve(newTodo);
        }, 1000);
      });
    },
    onMutate: (variables) => {
      // A mutation is about to happen!
      console.log('onMutate');
      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 }
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context?.id}`)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      console.log('onSuccess');
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log('onSettled');
    },
  });

  const newPokemon: PokemonBasicInfo = {
    id: 11,
    name: 'Some Pokemon Name'
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mutations</h1>
      </header>

      <div className="content">
        {mutation.isPending ? (
          'Adding todo...'
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? <div>Todo added!</div> : null}

            <button
              onClick={() => {
                mutation.mutate(newPokemon)
              }}
            >
              Create Todo
            </button>
          </>
        )}
      </div>

    </div>
  );
}

export default Mutations;
