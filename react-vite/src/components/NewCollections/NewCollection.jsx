import React, { useEffect } from 'react'
import "./NewCollection.css"

function NewArrivals() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='fall-container'>
      {/* <img className='fall-photo' src="https://lemonattire.s3.us-west-1.amazonaws.com/fall_bW_58750075.jpeg"></img> */}
      <img className='fall-photo' src="https://wallpapercave.com/wp/wp3376825.jpg" loading="lazy"></img>
      <div className='fall-collection'>Autumn Collection 2024</div>
      <div className='fall-coming-soon'>Coming Soon</div>
    </div>
  )
}

export default NewArrivals