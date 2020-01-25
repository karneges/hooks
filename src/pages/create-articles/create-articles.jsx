import React from 'react';
import ArticleForm from '../../components/article-form';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const CreateArticle = () => {
  const [isSuccessfullSubmit,setisSuccessfullSubmit] = useState(false)
  const apiUrl = '/articles'
  const [{response,error},doFetch] = useFetch(apiUrl);
  const initialValues = {
    title:'',
    description:'',
    body: '',
    tagList: []
  }
  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  }
  useEffect (() => {
    if (!response) {
      return
    }
      setisSuccessfullSubmit(true)
  },[response])

  if (isSuccessfullSubmit) {
    console.log(response.article.slug);
    
    return <Redirect to={`${response.article.slug}`}/>
  }
  return (
    <ArticleForm 
    errors={(error && error.errors) || {}} 
    initialValues={initialValues}
    onSubmit={handleSubmit}/>
  )
}
export default CreateArticle;