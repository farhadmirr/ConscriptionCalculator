import React from 'react'

const Divider = ({id,isHighlighted}) => {
  return (
    <div className='w-full flex justify-center mt-5'>
        <hr id={id} className={`w-1/2 border-1 transition-all duration-500 ${isHighlighted ? 'border-red-500 w-[70%]' : 'border-[#4cb5ae] w-1/2'}`} />
    </div>
  )
}

export default Divider