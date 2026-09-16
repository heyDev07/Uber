import React from 'react'
import VehicleIcon from './VehicleIcon'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='relative'>
                    <VehicleIcon type={props.vehicleType} size='lg' />
                    <i className="ri-loader-4-line animate-spin absolute -top-2 -right-2 text-3xl text-gray-700 bg-white rounded-full"></i>
                </div>
                <p className='text-sm text-gray-500 -mt-3'>Hang tight, we're finding you a captain...</p>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.pickup?.split(',')[ 0 ] || 'Pickup'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.destination?.split(',')[ 0 ] || 'Destination'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver