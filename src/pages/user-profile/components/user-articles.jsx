import React, { Fragment } from "react";
import { getPaginator, limit, getApiUrl } from "../../../utils/utils";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import Loading from "../../authentication/components/loading";
import ErrorMessage from "../../authentication/components/error-messag";
import Feed from "../../../components/feed";
import Pagination from "../../../components/pagination";

const UserArticles = ({ username, location, isFavorites,url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  console.log( location);
  
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{response,isLoading,error},doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()

  },[doFetch,isFavorites,apiUrl])
  console.log(response);
  

  return (
    <div>
      {isLoading && <Loading/>}
      {error && <ErrorMessage/>}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles}/>
          <Pagination total={response.articlesCount}
          limit={limit}
          currentPage={currentPage}
          url={url}/>
        </Fragment>
      )}
    </div>
  )
};

export default UserArticles;
