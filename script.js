const weekDayIndex = [6,0,1,2,3,4,5];
const currentDate = new Date();
let today = weekDayIndex[currentDate.getDay()];


function getElementById(elementId) {
    return document.getElementById(elementId);
}

const weekDays = weekDayIndex.map(index => getElementById(`${['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'][index]}-bar`));
const dayAmount = weekDayIndex.map(index => getElementById(`${['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'][index]}-spending`));


const barHeight = 9;

// Highlights current day's bar
function setHighlight(today) {
    weekDays[today].classList.add('current-day');  
}

// Sets height of the bar
function setBarHeight(index, height) {
    weekDays[index].style.height = `${height}rem`;
}

// Sets spending amount for specific day
function setAmount(index, amount) {
    dayAmount[index].innerHTML = `<p>$${amount}</p>`;
}

setHighlight(today);

fetch('data.json')
    .then(response => response.json())
    .then(data => {

        let maxAmount = -Infinity;

        data.forEach((item) => {
            const amount = item.amount;

            if (amount > maxAmount) {
                maxAmount = amount;
            }

        });
        
        let heightCoefficient = barHeight / maxAmount;

        data.forEach((item, index) => {
            const amount = item.amount;
            const adjustedHeight = heightCoefficient * amount;

            setBarHeight(index, adjustedHeight);
            setAmount(index, amount);
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
