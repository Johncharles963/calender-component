import { useState, useEffect } from 'react';

const Calender = ({ minHeight='200px', maxHeight='300px', height='30vh', minWidth='200px', maxWidth='500px', width='80vw' }) => {
    const n = 35
    const [currentYear, setCurrentYear] = useState();
    const [currentMonth, setCurrentMonth] = useState();
    const [currentDay, setCurrentDay] = useState(1);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState();
    const [lastDayOfMonth, setLastDayOfMonth] = useState();
    const [lastDayOPrvfMonth, setLastDayOfPrvMonth] = useState();
    const takenDays = [
        {
            year: 2023,
            month: 7,
            day: 15
        },
        {
            year: 2023,
            month: 8,
            day: 2
        },
        {
            year: 2023,
            month: 9,
            day: 28
        }
    ]


    const dayNames = ["Sunday", "Monday", "Tuesday", 'Wednesday', "Thursday", "Friday", "Saturday"]
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    useEffect(() => {
        // Update the document title using the browser API
        const d = new Date();
        setCurrentYear(d.getFullYear())
        setCurrentMonth(d.getMonth())

        // console.log(`${d.getFullYear()}-${d.getMonth()}-01`,d2,dayNames[d2.getDay()], d2.getDay(), currentMonth)
    }, []);

    useEffect(() => {
        // Update the document title using the browser API
        console.log(`${currentYear}-${currentMonth + 1}-01`)
        const d = new Date(currentYear, currentMonth, 1);
        setFirstDayOfMonth(d.getDay())
        setLastDayOfMonth(new Date(currentYear, currentMonth + 1, 0).getDate())
        setLastDayOfPrvMonth(new Date(currentYear, currentMonth, 0).getDate())
        console.log(d, dayNames[d.getDay()], d.getDay(), currentMonth)
    }, [currentMonth]);

    const nextMonth = () => {
        if (currentMonth >= 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        }
        else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    const prevMonth = () => {
        if (currentMonth <= 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        }
        else {
            setCurrentMonth(currentMonth - 1)
        }
    }
    const calculate = (i) => {
        return i < firstDayOfMonth || i > lastDayOfMonth + (firstDayOfMonth - 1) || takenDays.find((element) => (element.day == (i - firstDayOfMonth + 1) && element.month == currentMonth && element.year == currentYear))
    }
    console.log(currentMonth, firstDayOfMonth, lastDayOfMonth, currentYear)
    return (
            <div>
                <p style={{fontSize: '35px', fontWeight: 'bold'}}>
                    {currentYear}
                </p>
                <p style={{fontSize: '30px', fontWeight: 'bold'}} variant="h4" component="p">
                    {months[currentMonth]}
                </p>
                <button onClick={() => { prevMonth() }}>prev</button><button onClick={() => { nextMonth() }}>next</button>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                    height: height,
                    width: width, 
                    maxWidth: maxWidth, 
                    maxHeight: maxHeight,
                    minHeight: minHeight,
                    minWidth: minWidth, 
                }}>
                    {[...Array(n)].map((e, i) => (
                        <div key={i} style={{ border: '1px solid black', height: '20%', width: '13%', backgroundColor: calculate(i) ? 'grey' : 'white', cursor: calculate(i) ? 'not-allowed' : 'pointer' }}>
                            {firstDayOfMonth && lastDayOPrvfMonth &&
                                i < firstDayOfMonth ? lastDayOPrvfMonth - (firstDayOfMonth - i - 1) : i > lastDayOfMonth + (firstDayOfMonth - 1) ? i - (lastDayOfMonth + firstDayOfMonth - 1) : i - firstDayOfMonth + 1
                            }
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Calender