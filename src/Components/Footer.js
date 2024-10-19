import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
const Footer = () => {
    return (
        <div className='bottom-0 w-full flex justify-center'>
            <div className='flex w-[25rem] text-center bg-[#4CB5AE] px-5 rounded-t-lg text-lg text-white justify-center items-center gap-2'>
                <h2 className=''>All Rights Reserved</h2>
                <FontAwesomeIcon icon={faCopyright} />
            </div>

        </div>
    )
}

export default Footer