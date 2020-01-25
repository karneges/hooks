import React, {useEffect, Fragment} from 'react'
import {stringify} from 'query-string'


import Feed from '../../components/feed'
import useFetch from '../../hooks/useFetch'
import Pagination from '../../components/pagination'
import { getPaginator ,limit} from '../../utils/utils'
import Loading from '../authentication/components/loading'
import ErrorMessage from '../authentication/components/error-messag'
import FeedToggler from '../../components/feed-togler'
import PopularTags from '../../components/popular-tags'


const YourFeed = ({location,match}) => {
const {offset,currentPage} = getPaginator(location.search)
  const stringifyParams = stringify({
    limit,
    offset,
  })
  const url = match.url

  
  const apiUrl = `/articles/feed?${stringifyParams}`  
  console.log(apiUrl);
  
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch,apiUrl])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading/>}
            {error && <ErrorMessage/>}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination total={response.articlesCount} 
                limit={limit} url={url} currentPage={currentPage}/>
              </Fragment>
            )}
          </div>
          <div className="col-md-3"><PopularTags/></div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed;
