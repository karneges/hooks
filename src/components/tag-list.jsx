import React from 'react';

const TagList = ({tagList}) => {
  console.log(tagList);
  
  return (
    <ul className="tag-list">
    {tagList.map(tag => (
      <li key={tag} className="tag-default tag pill tag-outline">
        {tag}
      </li>
    ))}
  </ul>
  )
}

export default TagList;