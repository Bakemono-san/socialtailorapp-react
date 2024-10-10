import React from 'react'

export default React.memo(

  function StatsCard(props) {
    return (
      <div className={`w-full lg:block hidden`}>
        {/* Card Header */}

        <div className='flex items-center gap-2 px-4 py-3 bg-blue-300 rounded-t'>
          <h1 className='text-center text-2xl font-bold text-white w-full'>
            {props.title}
          </h1>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className={` ${props.status == null ? "absolute flex flex-col gap-4 items-center justify-center w-full h-full inset-0 bg-black" : ""} p-2 text-center`}>
              <p className='text-white 2xl:text-lg animate-bounce inset-0 mx-auto'>Fait un abonnement premium pour acceder a tes stats</p>
              <button className='text-white bg-yellow-600 p-2 rounded'>abonnement premium</button>
          </div>
          {/* Flex Container for Stats */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4">
            {/* Stat: Nombre de posts */}
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Nombre de posts :</p>
              <p className="text-xl font-semibold">326</p>
            </div>

            {/* Stat: Nombre de followers */}
            <div className="flex-1 text-right sm:text-end">
              <p className="text-gray-600 text-sm">Nombre de followers :</p>
              <p className="text-xl font-semibold">12,345</p>
            </div>

            {/* Rang (centered on all screen sizes) */}
            <div className="flex justify-center items-center w-full">
              <div className='p-8 w-14 h-14 flex items-center justify-center flex-col rounded-full bg-indigo-300'>
                <p className="text-gray-600 text-sm">Rang</p>
                <p className="text-xl font-semibold text-white">5</p>
              </div>
            </div>

            {/* Stat: Nombre de followings */}
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Nombre de followings :</p>
              <p className="text-xl font-semibold">789</p>
            </div>

            {/* Stat: Moyenne de likes */}
            <div className="flex-1 text-right sm:text-end">
              <p className="text-gray-600 text-sm">Moyenne de likes :</p>
              <p className="text-xl font-semibold">2,500</p>
            </div>
          </div>
        </div>
      </div>
    )
  }); 
