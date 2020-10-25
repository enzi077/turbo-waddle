import React from 'react'

const Country=({dates,cases})=> {
    console.log(dates,cases);
    return (
        <div>
            {dates.map(date=>(
                <p>{date.split('/')[1]}</p>
            ))}
        </div>
    )
}

export default Country
