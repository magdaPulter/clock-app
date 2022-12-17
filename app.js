const refreshBtn = document.querySelector('#refresh')
const quote = document.querySelector('#quote')
const quoteAuthor = document.querySelector('#quoteAuthor')
const currentTime = document.querySelector('#currentTime')
const city = document.querySelector('#city')

refreshBtn.addEventListener('click', async function(){
    showQuote()
})

const showQuote = async () => {
    try {
        const res = await fetch('https://api.quotable.io/random')
        const data = await res.json()

        quote.textContent = `"${data.content}"`
        quoteAuthor.textContent = data.author
    } catch(err) {
        console.log('Error', err)
    }
}


const showTime = async () => {
    try{
        const res = await fetch('https://worldtimeapi.org/api/ip')
        const data = await res.json()

        const time = data.datetime.slice(11,16)
        currentTime.textContent = time
        currentTime.classList.add('current-time')
        const timezone = data.timezone.slice(7,13)
        city.textContent = timezone 

        const moreInfo = document.querySelector('.more-info')
        moreInfo.innerHTML = `
                <li>
                    <p>CURRENT TIMEZONE</p>
                    <h2 id="timezone">${timezone}</h2>
                </li>
                <li>
                    <p>DAY OF THE YEAR</p>
                    <h2 id="day-year">${data.day_of_year}</h2>
                </li>
                <li>
                    <p>DAY OF THE WEEK</p>
                    <h2 id="day-week">${data.day_of_week}</h2>
                </li>
                <li>
                    <p>WEEK NUMBER</p>
                    <h2 id="week">${data.week_number}</h2>
                </li>
                `


        const hour = data.datetime.slice(11,13)
        if(hour < 16 || (hour <= 1 && hour >= 7)){
            document.querySelector('body').classList.add('day-mode')
        } 
        else {
            document.querySelector('.main-container').classList.remove('day-mode')
        }


    } catch(err){
        console.log('Error', err)
    }
}

document.getElementById('more').addEventListener('click', () => {
    document.querySelector('.main-content').classList.toggle('more-active')
    document.getElementById('more').classList.toggle('active')
    
})


showTime()
showQuote()