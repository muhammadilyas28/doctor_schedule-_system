function generateSchedule() {
    const doctorName = document.getElementById('doctorName').value;

    const startHour = document.getElementById('startHour').value;
    const startMinute = document.getElementById('startMinute').value;
    const startPeriod = document.getElementById('startPeriod').value;

    const endHour = document.getElementById('endHour').value;
    const endMinute = document.getElementById('endMinute').value;
    const endPeriod = document.getElementById('endPeriod').value;

    const daysOffElements = document.querySelectorAll('input[name="daysOff"]:checked');
    
    let daysOff = [];
    daysOffElements.forEach(element => {
        daysOff.push(element.value);
    });

    const startTime = `${startHour}:${startMinute} ${startPeriod}`;
    const endTime = `${endHour}:${endMinute} ${endPeriod}`;

    // Generate calendar
    generateCalendar(daysOff, startTime, endTime);

    const scheduleOutput = document.getElementById('scheduleOutput');
    if (scheduleOutput) {
        scheduleOutput.innerHTML = `
            <h3 class="text-xl font-bold mb-2 text-blue-600">Schedule for Dr. ${doctorName}</h3>
            <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
            <p><strong>Days Off:</strong> ${daysOff.join(', ')}</p>
        `;
        scheduleOutput.classList.remove('hidden');
        scheduleOutput.scrollIntoView({ behavior: 'smooth' });
    }
}

function generateCalendar(daysOff, startTime, endTime) {
    const calendar = document.getElementById('calendar');
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = ''; // Clear previous calendar

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDay = today.getDate();

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let day = currentDay; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = dayNames[date.getDay()];
        const isOffDay = daysOff.includes(dayName);

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('p-4', 'border', 'border-gray-300', 'rounded-lg', 'text-center', 'cursor-pointer');
        dayDiv.innerHTML = `
            <p class="font-bold">${day}</p>
            <p class="text-gray-600">${dayName}</p>
        `;
        dayDiv.dataset.date = date.toISOString().split('T')[0];

        if (isOffDay) {
            dayDiv.classList.add('bg-red-100', 'text-red-500', 'cursor-not-allowed');
        } else {
            dayDiv.classList.add('bg-green-100', 'text-green-500');
            dayDiv.innerHTML += `<p class="mt-2 text-green-700">${startTime} - ${endTime}</p>`;
        }

        dayDiv.addEventListener('click', toggleDayOff);

        calendarGrid.appendChild(dayDiv);
    }

    calendar.classList.remove('hidden');
}

function toggleDayOff(event) {
    const dayDiv = event.currentTarget;
    const isOffDay = dayDiv.classList.contains('bg-red-100');

    const startTime = document.getElementById('startHour').value + ':' + document.getElementById('startMinute').value + ' ' + document.getElementById('startPeriod').value;
    const endTime = document.getElementById('endHour').value + ':' + document.getElementById('endMinute').value + ' ' + document.getElementById('endPeriod').value;

    if (isOffDay) {
        dayDiv.classList.remove('bg-red-100', 'text-red-500', 'cursor-not-allowed');
        dayDiv.classList.add('bg-green-100', 'text-green-500');
        dayDiv.innerHTML += `<p class="mt-2 text-green-700">${startTime} - ${endTime}</p>`;
    } else {
        dayDiv.classList.remove('bg-green-100', 'text-green-500');
        dayDiv.classList.add('bg-red-100', 'text-red-500', 'cursor-not-allowed');
        dayDiv.innerHTML = dayDiv.innerHTML.split('<p class="mt-2 text-green-700">')[0];
    }
}
