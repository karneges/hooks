import React from 'react';

const BackendErrorMessages = ({ backednErrors }) => {
  const errorMessages = Object.keys(backednErrors).map((name) => {
    const messages = backednErrors[name].join(' ')
    return `${name} ${messages}`
  })
  return (
    <ul className='error-messages'>
      {errorMessages.map((errorMessage) => {
        return (
          <li key={errorMessage}> {errorMessage}</li>
        )
      })}

    </ul>
  )
};
export default BackendErrorMessages;