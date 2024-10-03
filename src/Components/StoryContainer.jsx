import React from 'react'
import StoryItem from './StoryItem'

export default function StoryContainer() {
    return (
        <div className='flex gap-8 w-full !min-w-32 py-4 px-2 md:py-0'>
                <button className="btn rounded w-40 h-40 flex flex-col border border-blue-500 p-2" onClick={() => document.getElementById('my_modal_2').showModal()}>
                    <div className=' bg-blue-400/50 justify-center items-center rounded h-full gap-2 w-full flex flex-col'>
                        <div className='w-12 h-12 p-4 rounded-full bg-blue-400 flex items-center justify-center'>
                            +
                        </div>
                        <p>Add Storie</p>
                    </div>
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Create a storie</h3>
                        <p className="py-4">Select a model : </p>
                        <div>
                            <p>Model 1</p>
                            <p>Model 2</p>
                            <p>Model 3</p>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            <div className='flex gap-8 overflow-x-scroll w-full'>
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
            </div>
        </div>
    )
}
