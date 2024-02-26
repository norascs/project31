document.addEventListener('DOMContentLoaded', () => {
    const races = [
        {
            name: 'Triton 5k',
            mapImage: 'images/race1-map.png', 
            miles: 3.1, 
            time: '00:32:17',
            splitPaces: [6.28], 
        },
        {
            name: 'San Diego Resolution Run',
            miles: 6.2, 
            time: '1:02:23',
            splitPaces: [10.04], 
        }
    ];

    races.forEach((race, index) => {

        document.querySelector(`#race${index + 1} .race-name`).textContent = race.name;
        document.querySelector(`#race${index + 1} .miles`).textContent = `${race.miles} miles`;
        document.querySelector(`#race${index + 1} .time`).textContent = race.time;

        const mileLabels = [...Array(7).keys()].map(i => `${i + 1} Mile`); 
        const mileTimes = calculateMileTimes(race.miles, race.time, race.splitPaces[0]);

        const raceChartCanvas = document.getElementById(`race${index + 1}Chart`);
        new Chart(raceChartCanvas, {
            type: 'line',
            data: {
                labels: mileLabels,
                datasets: [{
                    label: 'Time (minutes)',
                    data: mileTimes,
                    borderColor: index === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    });

    function calculateMileTimes(miles, totalTime, pace) {

        const [hours, minutes, seconds] = totalTime.split(':').map(num => parseFloat(num));
        const totalMinutes = hours * 60 + minutes + seconds / 60;

        const mileTimes = [];
        for (let mile = 1; mile <= 10; mile++) {
            if(mile <= miles) {
                const timeForMile = totalMinutes / miles * mile;
                mileTimes.push(timeForMile);
            } else {
                mileTimes.push(null); 
            }
        }
        return mileTimes;
    }
});