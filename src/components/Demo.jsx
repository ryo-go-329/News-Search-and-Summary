import React from 'react'
import { useState, useEffect } from 'react';

import {copy, linkIcon, loader,tick} from '../assets';
import { useLazyGetSummaryQuery } from '../services/api/article';


const Demo = () => {
  // const [postTranslate] = useLazyPostTranslateQuery();

  const [sumLang,setSumLang] = useState('ja');

  const [article, setArticle] = useState({
   url:'',
   summary:'',
  });

  const [allArticle, setAllArticle] = useState([]);

  const [getSummary,{ error, isFetching }] = useLazyGetSummaryQuery();
  // console.log(getSummary);

  useEffect(() => {
    const articlesFormLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if (articlesFormLocalStorage) {
      setAllArticle(articlesFormLocalStorage)
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data } = await getSummary({articleUrl:article.url,langage:sumLang});
    // console.log(data);
    if(data?.summary) {
      const newArticle = {...article,summary:data.summary};

      const updateAllArticle = [newArticle,...allArticle];
    
      setArticle(newArticle);
      setAllArticle(updateAllArticle);

      localStorage.setItem('article',JSON.stringify(updateAllArticle));
      // console.log(newArticle);
    }
  };
  return (
    <section className='mt-16 w-full max-w-xl'>
      <h1 className='blue_gradient font-bold text-gray-600 text-xl text-center mb-4'>URL for summarising</h1>
      <nav className='flex justify-center items-center mb-4 mt-2'>
      <button
        className={`mr-2 border border-gray rounded-md  py-1 px-2 hover:bg-slate-100 ${sumLang === 'ja' ? 'bg-blue-300': 'bg-white hover:bg-slate-100'}`}
        onClick={() => setSumLang('ja')}>
      Japanese
      </button>
      <button
        className={`mr-2 border border-gray rounded-md  py-1 px-2  ${sumLang === 'en' ? 'bg-blue-300': 'bg-white hover:bg-slate-100'}`}
        onClick={() => setSumLang('en')}>
      English
      </button>
      </nav>
      <div className='flex flex-col w-full gap-2'>
        <form 
        className='relative flex justify-center items-center'
        onSubmit={handleSubmit}
        >
        <img src={linkIcon} 
        alt='link_icon'
        className='absolute left-0 my-2 ml-3 w-5'
        />
        <input 
        type='url'
        placeholder='Enter a URL'
        value={article.url}
        onChange={(e) => setArticle({...article,url:e.target.value})}
        required
        className='url_input peer'
        />
        <button 
        type='submit'
        className='submit_btn 
        peer-focus:border-gray-700
        peer-focus:text-gray-700'
        
        >
          Enter
        </button>
        </form>
        {/* Browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticle.map((item,index) => (
            <div 
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn'>
                <img src={copy} alt='copy_icon' className='w-[40%] h-[40%] object-contain' />
              </div>
              <p 
              className='flex-1 font-satoshi
               text-blue-700 font-medium text-sm truncate'
              >
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-10 h-20 object-contain' />
        ): error ? (
          <p className='font-inter font-bold text-black text-center'>
            Sorry, Error Ocured...<br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ): (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl text-center mb-4 blue_gradient'>Summary</h2>
              <div className='summary_box'>
                <p className='font-inter font-medium'>{article.summary}</p>
              </div>
              
            </div>
          )
        )}

      </div>
    </section>
  )
}

export default Demo
