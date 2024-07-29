import React from 'react';

type paginationType = {
  total: number | undefined,
  limit: number,
  onChange?(page: number): void,
  current: number | undefined
}

const Pagination: React.FC<paginationType> = ({ total, limit, onChange, current }) => {
  let arraySize = 10;

  if (!total || limit <= 0) {
    return (
      <div className='Pagination'><li>1</li></div>
    )
  }

  arraySize = Math.ceil(total / limit);

  function handleOnClick(page: number) {
    if (onChange) {
      onChange(page);
    }
  }

  return (
    <div className='Pagination'>
      <ul>
        <li>&lt;</li>
        {Array(arraySize).fill(0).map((n, i) => <li
        className={current == i + 1 ? 'active' : ''}
        key={`pag-${total}-${limit}-${i}`}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
          handleOnClick(i+1);
        }}>{i+1}</li>)}
        <li>&gt;</li>
      </ul>
    </div>
  )
}

export default Pagination;