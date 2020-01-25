import React from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import ArticleForm from "../../components/article-form";
import { useState } from "react";
import Loading from "../authentication/components/loading";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUser";

const EditArticle = ({ match }) => {
  const {currentUserState} = useContext(CurrentUserContext)
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValue] = useState(null);
  const [isSuccessfullSubmit,setisSuccessfullSubmit] = useState(false)
  const handleSubmit = article => {
    console.log(article);

    doUpdateArticle({
      method: "put",
      data: {
        article
      }
    });
  };
  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    const { title, body, description, tagList } = fetchArticleResponse.article;
    setInitialValue({
      title,
      body,
      description,
      tagList
    });
  }, [fetchArticleResponse]);
useEffect (() => {
  if(!updateArticleResponse){
    return
  }
  setisSuccessfullSubmit(true)
},[updateArticleResponse])

if (isSuccessfullSubmit) {
  return <Redirect to={`articles/${slug}`}/>
}
if (!currentUserState.isLoggedIn === false) {
  return <Redirect to='/'/>
}
  return (
    <>
      {!fetchArticleResponse && <Loading />}
      {fetchArticleResponse && (
        <ArticleForm
          onSubmit={handleSubmit}
          errors={(updateArticleError && updateArticleError.errors) || {}}
          initialValues={initialValues}
        />
      )}
    </>
  );
};

export default EditArticle;
