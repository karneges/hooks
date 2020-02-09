import React from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import Loading from "../authentication/components/loading";
import ErrorMessage from "../authentication/components/error-messag";
import TagList from "../../components/tag-list";
import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { useState } from "react";

const Article = props => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const isAuthor = () => {
    debugger
    if (!fetchArticleResponse || !currentUserState.currentUser) {
      return false;
    }
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  const onDeleteArticle = () => {
    doDeleteArticle({
      method: "delete"
    });
  };
  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={onDeleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tagList={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Article;
