import React from 'react'

export default function StatsCard(props) {
  return (
    <>
      <div className='flex items-center gap-2 px-4 py-3 bg-blue-300 rounded-t min-w-96'>
        <h1 className='text-center text-2xl font-bold text-white w-full'> {props.title} </h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-gray-600 text-sm">Nombre de posts :</p>
            <p className="text-xl font-semibold">326</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Nombre de followers :</p>
            <p className="text-xl font-semibold">12,345</p>
          </div>
          <div className="col-span-2 text-center flex items-center justify-center">
            <div className='p-8 w-14 h-14 flex items-center justify-center flex-col rounded-full bg-indigo-300'>
              <p className="text-gray-600 text-sm">Rang</p>
              <p className="text-xl font-semibold text-white">5 </p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-gray-600 text-sm">Nombre de followings :</p>
            <p className="text-xl font-semibold">789</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Moyenne de likes :</p>
            <p className="text-xl font-semibold">2,500</p>
          </div>

        </div>
      </div>

    </>
  )
}
