import React from 'react'
import {logo} from '../assets';
const Hero = () => {
  return (
    <header className='w-full flex justify-center
    items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-2 pt-3'>
        <div className='flex items-center justify-center'>
          <img src="artificial-intelligence.png" alt='sumz_logo'
          className='w-10 object-contain mr-2'
          />
          <h1 className='font-bold text-blue-400'>News Search and Summary</h1>
        </div>
        <button 
        type='button'
        onClick={() => window.open('https://https://github.com/ryo-go-329')}
        className='black_btn'
        >
          Git Hub
        </button>
      </nav>
      <h1 className='head_text blue_gradient'>
        News Search and Summary
      </h1>
      <h2 className='desc'>
        This is an app that allows you to search and summarize news.<br />
        The search function allows you to retrieve up to 100 related news items by entering a keyword.<br/>
        Please summarize if there is anything you are interested in.<br />
        In the summary function, if you enter the URL of the news, a summarized text will be displayed.<br />
        You can select the language of the summary between Japanese and English.<br />
        このアプリはニュースの検索と要約ができます。<br />
        キーワードを検索すると最大100件の関連するニュースを取得できます。<br />
        また任意のニュースのURLを入力すると、そのニュースが要約された文章が表示されます。
      </h2>
    </header>
  )
}

export default Hero
