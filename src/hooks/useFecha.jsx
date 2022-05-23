import { useEffect, useState } from 'react' 

export const useFecha = () =>
{
    const [ fecha, setFecha ] = useState('')
    useEffect(() =>
    {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        setFecha(`${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`)
    },[])

    return { fecha }
}