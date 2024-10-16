import React, { useRef } from 'react'

export default function ModalResponse(props) {
    const modal = useRef(ModalResponse)

    const closeModal = () => modal.current.style.display = 'none';

    return (
        <div className='bg-black/70 absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center' ref={modal}>
            <div className='flex flex-col  justify-center w-1/2 md:w-1/3 rounded bg-white '>

                <div className='flex justify-end md:p-4 p-1'>
                    <button className='text-red-500 text-lg' onClick={closeModal}>x</button>
                </div>
                <div className='text-center md:min-h-32 flex items-center justify-center md:text-lg p-4'>
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    )
}
