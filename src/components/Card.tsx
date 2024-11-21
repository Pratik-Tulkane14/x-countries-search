import React from 'react'
interface cardProps {
    src: string,
    alt: string,
    countryName: string
}
const Card: React.FC<cardProps> = ({ src, alt, countryName }) => {
    return (
        <div className='card'>
            <img src={src} alt={alt} />
            <span>{countryName}</span>
        </div>
    )
}

export default Card