import React from 'react'

const Pagenation = ({articlesLength,handlePagination}) => {
    const pages = Math.ceil(articlesLength / 20);
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
  return (
    <nav className='flex justify-center items-center mt-4'>
        {pageNumbers.map((number) => (
            <button key={number}
                className='mr-2 border border-gray rounded-md bg-white py-1 px-2 hover:bg-slate-100'
                onClick={() => handlePagination(number)}>
            {number}
            </button>
        ))}
    </nav>
  )
}

export default Pagenation
