import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
const Footer = () => {
    return (
        <div className='w-full flex justify-center place-self-end h-10  hover:h-24 transition-all overflow-hidden hidden'>
            <div className='flex flex-col w-[25rem] text-center bg-[#4CB5AE] px-5 pt-2 rounded-t-lg text-lg items-center text-white justify-between gap-2 transition-all duration-700 h-full hover:bg-slate-500'>
                <div className='flex items-center gap-2'>
                    <h2 className=''>All Rights Reserved</h2>
                    <FontAwesomeIcon icon={faCopyright} className='text-sm mb-1'/>
                </div>
                <a href='https://github.com/farhadmirr/ConscriptionCalculator' target='_blank' className='text-sm'>If you found this tiny project usefull you can help me by giving me stars on my Github repository</a>
            </div>

        </div>
    )
}

export default Footer