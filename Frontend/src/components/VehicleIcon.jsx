import React from 'react'

const STYLES = {
    car: { icon: 'ri-taxi-fill', bg: 'bg-black' },
    moto: { icon: 'ri-motorbike-fill', bg: 'bg-orange-500' },
    auto: { icon: null, bg: 'bg-green-600' },
}

const SIZES = {
    sm: { box: 'h-10 w-10', icon: 'text-xl', svg: 'w-5 h-5' },
    lg: { box: 'h-20 w-20', icon: 'text-4xl', svg: 'w-10 h-10' },
}

const AutoRickshawGlyph = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="white">
        <path d="M4 16h1a2 2 0 1 0 3.8-1h6.4a2 2 0 1 0 3.8 1h1a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 0-1.2-2.14L17 8.5V6a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1H8.5A2.5 2.5 0 0 0 6.1 8.6L4.3 11H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1zM7 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm10 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
)

const VehicleIcon = ({ type, size = 'sm', className = '' }) => {
    const { icon, bg } = STYLES[ type ] || STYLES.car
    const { box, icon: iconSize, svg } = SIZES[ size ] || SIZES.sm

    return (
        <div className={`${box} ${bg} rounded-full flex items-center justify-center shrink-0 ${className}`}>
            {icon ? <i className={`${icon} text-white ${iconSize}`}></i> : <AutoRickshawGlyph className={svg} />}
        </div>
    )
}

export default VehicleIcon
