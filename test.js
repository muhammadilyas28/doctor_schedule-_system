function generateSchedule() {
    const doctorName = document.getElementById('doctorName').value;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const schedule = {};

    days.forEach(day => {
        const toggle = document.getElementById(day.toLowerCase() + 'Toggle').checked;
        const startTime = document.getElementById(day.toLowerCase() + 'StartTime').value;
        const endTime = document.getElementById(day.toLowerCase() + 'EndTime').value;
        schedule[day] = toggle ? { startTime, endTime } : null;
    });

    generateCalendar(schedule);

    const scheduleOutput = document.getElementById('scheduleOutput');
    scheduleOutput.innerHTML = `
        <h3 class="text-xl font-bold mb-2 text-blue-600">Schedule for Dr. ${doctorName}</h3>
        ${days.map(day => `
            <p><strong>${day}:</strong> ${schedule[day] ? `${schedule[day].startTime} - ${schedule[day].endTime}` : 'Not working'}</p>
        `).join('')}
    `;
    scheduleOutput.classList.remove('hidden');
    scheduleOutput.scrollIntoView({ behavior: 'smooth' });
}

function generateCalendar(schedule) {
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
        const isWorkingDay = schedule[dayName] !== null;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('p-4', 'border', 'border-gray-300', 'rounded-lg', 'text-center', 'cursor-pointer');
        dayDiv.innerHTML = `
            <p class="font-bold">${day}</p>
            <p class="text-gray-600">${dayName}</p>
        `;
        dayDiv.dataset.date = date.toISOString().split('T')[0];

        if (isWorkingDay) {
            dayDiv.classList.add('bg-green-100', 'text-green-500');
            dayDiv.innerHTML += `<p class="mt-2 text-green-700">${schedule[dayName].startTime} - ${schedule[dayName].endTime}</p>`;
        } else {
            dayDiv.classList.add('bg-red-100', 'text-red-500');
        }

        dayDiv.addEventListener('click', () => {
            const dayToggle = document.getElementById(dayName.toLowerCase() + 'Toggle');
            dayToggle.checked = !dayToggle.checked;
            updateDayStatus(dayName.toLowerCase());
        });

        calendarGrid.appendChild(dayDiv);
    }

    calendar.classList.remove('hidden');
}

function updateDayStatus(day) {
    const toggle = document.getElementById(day + 'Toggle').checked;
    const startTime = document.getElementById(day + 'StartTime').value;
    const endTime = document.getElementById(day + 'EndTime').value;
    const schedule = {
        [day.charAt(0).toUpperCase() + day.slice(1)]: toggle ? { startTime, endTime } : null
    };

    const calendarGrid = document.getElementById('calendarGrid');
    Array.from(calendarGrid.children).forEach(dayDiv => {
        const dayName = new Date(dayDiv.dataset.date).toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
        if (dayName === day) {
            dayDiv.classList.toggle('bg-green-100', toggle);
            dayDiv.classList.toggle('text-green-500', toggle);
            dayDiv.classList.toggle('bg-red-100', !toggle);
            dayDiv.classList.toggle('text-red-500', !toggle);
            dayDiv.innerHTML = `
                <p class="font-bold">${new Date(dayDiv.dataset.date).getDate()}</p>
                <p class="text-gray-600">${day.charAt(0).toUpperCase() + day.slice(1)}</p>
                ${toggle ? `<p class="mt-2 text-green-700">${startTime} - ${endTime}</p>` : ''}
            `;
        }
    });
}

document.querySelectorAll('.switch input').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        const day = e.target.closest('.switch').nextElementSibling.textContent.toLowerCase();
        updateDayStatus(day);
    });
});
