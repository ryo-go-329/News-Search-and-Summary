import React, { useEffect, useState } from 'react'
import Clipboard from 'clipboard';
import {copy} from '../assets';
import Pagenation from './Pagenation';
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

const articles_test = [
    {title: "Brave lays off 9% of its workforce",url: "https://techcrunch.com/2023/10/06/brave-lays-off-9-of-its-workforce/",publishedAt: "2023-10-07T12:11:21Z"},
    {title: "Brave lays off 9% of its workforce",url: "https://techcrunch.com/2023/10/06/brave-lays-off-9-of-its-workforce/",publishedAt: "2023-10-07T12:11:21Z"},
    {title: "Brave lays off 9% of its workforce",url: "https://techcrunch.com/2023/10/06/brave-lays-off-9-of-its-workforce/",publishedAt: "2023-10-07T12:11:21Z"},
    {title: "How to Watch Taylor Swift, Travis Kelce at Kansas City Chiefs vs. New York Jets Tonight - CNET",url: "https://www.cnet.com/tech/services-and-software/how-to-watch-taylor-swift-travis-kelce-at-kansas-city-chiefs-vs-new-york-jets-tonight/",publishedAt: "2023-10-07T12:11:21Z"},
];

const News = () => {
    const [query,setQuery] = useState("");
    const [articles,setArticles] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const handleSubmit =  (e) => {
        e.preventDefault()
        fetchArticles()
        console.log(articles);
    }
    const fetchArticles = async () => {
        try{
            const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`);
            const data = await res.json();
            console.log(data);
            setArticles(data.articles);
            
        } catch (error) {
            console.log(error.message);
            alert("記事の取得に失敗しました");
        }
    }

    const lastArticle = currentPage * 20;
    const firstArticle = lastArticle - 20;
    const currentArticles = articles.slice(firstArticle,lastArticle);

    const handlePagination = (page) => {
        setCurrentPage(page);
    }
    const copyToClipboard = (url) => {
        new Clipboard('.copy_target', {
          text: () => url
        });
      };

  return (
    <section className='mt-16 w-full max-w-xl'>
        <h1 className='blue_gradient font-bold text-gray-600 text-xl text-center mb-4'>News Search</h1>
        <div className='flex flex-col w-full gap-2'>
            <form 
                className='relative flex justify-center items-center'
                onSubmit={handleSubmit}
            >
                <input 
                    type='text'
                    placeholder='Keyword'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    className='url_input peer'
                />
                <button 
                    type='submit'
                    className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
                >
                Enter
                </button>
            </form>
        </div>
        {currentArticles.map((article,index) => (
            <div key={index}
            className='news_item mt-3'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='font-bold mr-4  text-lg leading-normal'>{article.title}</h1>
                    <p className='leading-normal text-md'>{article.publishedAt.substring(0,10)}</p>
                </div>
                <div className='flex justify-start items-center'>
                    <button className='copy_btn copy_target mr-4' onClick={() => copyToClipboard(article.url)}>
                        <img src={copy} alt='copy_icon' className='w-[60%] h-[60%] object-contain' />
                    </button>
                    <p className=''><a href={article.url} target='_blank' className='hover:text-blue-400'>{article.url}</a></p>
                </div>
            </div>
        ))}
        <Pagenation 
            articlesLength={articles.length}
            handlePagination={handlePagination} />
    </section>
  )
}

export default News
