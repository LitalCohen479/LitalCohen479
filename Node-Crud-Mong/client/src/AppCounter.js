import React from 'react'

function AppCounter({total}) {
  return (
    <div className='app__counter'>
        <h2>Total Calories: <span>{total}</span></h2>
    </div>
  )
}

export default AppCounter