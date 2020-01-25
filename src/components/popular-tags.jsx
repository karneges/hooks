import React from 'react';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import Loading from '../pages/authentication/components/loading';
import { Link } from 'react-router-dom';

const PopularTags = () => {

  const [{ isLoading, response,  }, doFetch] = useFetch('/tags')
useEffect(() => {
  doFetch()
},[doFetch])
  if (isLoading || !response) {
    return <Loading/>
  }

    return (
    <div className='sidebar'>
      <p>Popular tags</p>
      <div className='tag-list'>
        {response.tags.map((tag) => {
          return (
          <Link 
          to={`/tags/${tag}`} 
          className='tag-default tag-pill' 
          key={tag}> {tag}</Link>
          )
        })}
      </div>
    </div>
      )

}

export default PopularTags;