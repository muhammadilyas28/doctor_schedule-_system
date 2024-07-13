document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    body.className = "flex items-center justify-center min-h-screen bg-gray-100";

    const container = document.createElement("div");
    container.className = "w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg mb-10";

    const title = document.createElement("h2");
    title.className = "text-3xl font-bold mb-6 text-center text-blue-600";
    title.innerText = "Doctor Availability Schedule";
    container.appendChild(title);

    const form = document.createElement("form");
    form.id = "scheduleForm";
    form.className = "space-y-6";

    // Doctor Name
    const doctorNameDiv = document.createElement("div");
    const doctorNameLabel = document.createElement("label");
    doctorNameLabel.htmlFor = "doctorName";
    doctorNameLabel.className = "block text-gray-700 font-semibold";
    doctorNameLabel.innerText = "Doctor Name";
    const doctorNameInput = document.createElement("input");
    doctorNameInput.type = "text";
    doctorNameInput.id = "doctorName";
    doctorNameInput.className = "w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    doctorNameInput.placeholder = "Enter doctor's name";
    doctorNameDiv.appendChild(doctorNameLabel);
    doctorNameDiv.appendChild(doctorNameInput);
    form.appendChild(doctorNameDiv);

    // Time Schedule Generator
    const timeScheduleDiv = document.createElement("div");
    const timeScheduleLabel = document.createElement("label");
    timeScheduleLabel.htmlFor = "timeSchedule";
    timeScheduleLabel.className = "block text-gray-700 font-semibold";
    timeScheduleLabel.innerText = "Time Schedule";
    timeScheduleDiv.appendChild(timeScheduleLabel);

    const timeGrid = document.createElement("div");
    timeGrid.className = "grid grid-cols-2 gap-4 mt-1";

    const startTimeDiv = document.createElement("div");
    const startTimeLabel = document.createElement("label");
    startTimeLabel.htmlFor = "startTime";
    startTimeLabel.className = "block text-gray-600";
    startTimeLabel.innerText = "Start Time";
    startTimeDiv.appendChild(startTimeLabel);

    const startFlex = document.createElement("div");
    startFlex.className = "flex items-center mt-1";

    const startHourInput = document.createElement("input");
    startHourInput.type = "number";
    startHourInput.id = "startHour";
    startHourInput.className = "w-1/3 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    startHourInput.min = 1;
    startHourInput.max = 12;
    startHourInput.placeholder = "HH";

    const startMinuteInput = document.createElement("input");
    startMinuteInput.type = "number";
    startMinuteInput.id = "startMinute";
    startMinuteInput.className = "w-1/3 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
    startMinuteInput.min = 0;
    startMinuteInput.max = 59;
    startMinuteInput.placeholder = "MM";

    const startPeriodSelect = document.createElement("select");
    startPeriodSelect.id = "startPeriod";
    startPeriodSelect.className = "w-1/3 px-3 py-2 border-r border-t border-b border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    const startAmOption = document.createElement("option");
    startAmOption.innerText = "AM";
    const startPmOption = document.createElement("option");
    startPmOption.innerText = "PM";
    startPeriodSelect.appendChild(startAmOption);
    startPeriodSelect.appendChild(startPmOption);

    startFlex.appendChild(startHourInput);
    startFlex.appendChild(startMinuteInput);
    startFlex.appendChild(startPeriodSelect);
    startTimeDiv.appendChild(startFlex);
    timeGrid.appendChild(startTimeDiv);

    const endTimeDiv = document.createElement("div");
    const endTimeLabel = document.createElement("label");
    endTimeLabel.htmlFor = "endTime";
    endTimeLabel.className = "block text-gray-600";
    endTimeLabel.innerText = "End Time";
    endTimeDiv.appendChild(endTimeLabel);

    const endFlex = document.createElement("div");
    endFlex.className = "flex items-center mt-1";

    const endHourInput = document.createElement("input");
    endHourInput.type = "number";
    endHourInput.id = "endHour";
    endHourInput.className = "w-1/3 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    endHourInput.min = 1;
    endHourInput.max = 12;
    endHourInput.placeholder = "HH";

    const endMinuteInput = document.createElement("input");
    endMinuteInput.type = "number";
    endMinuteInput.id = "endMinute";
    endMinuteInput.className = "w-1/3 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
    endMinuteInput.min = 0;
    endMinuteInput.max = 59;
    endMinuteInput.placeholder = "MM";

    const endPeriodSelect = document.createElement("select");
    endPeriodSelect.id = "endPeriod";
    endPeriodSelect.className = "w-1/3 px-3 py-2 border-r border-t border-b border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    const endAmOption = document.createElement("option");
    endAmOption.innerText = "AM";
    const endPmOption = document.createElement("option");
    endPmOption.innerText = "PM";
    endPeriodSelect.appendChild(endAmOption);
    endPeriodSelect.appendChild(endPmOption);

    endFlex.appendChild(endHourInput);
    endFlex.appendChild(endMinuteInput);
    endFlex.appendChild(endPeriodSelect);
    endTimeDiv.appendChild(endFlex);
    timeGrid.appendChild(endTimeDiv);
    timeScheduleDiv.appendChild(timeGrid);
    form.appendChild(timeScheduleDiv);

    // Days Off
    const daysOffDiv = document.createElement("div");
    const daysOffLabel = document.createElement("label");
    daysOffLabel.className = "block text-gray-700 font-semibold";
    daysOffLabel.innerText = "Days Off";
    daysOffDiv.appendChild(daysOffLabel);

    const daysGrid = document.createElement("div");
    daysGrid.className = "grid grid-cols-2 gap-4 mt-2";

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "flex items-center";
        const dayInput = document.createElement("input");
        dayInput.type = "checkbox";
        dayInput.id = `${day.toLowerCase()}Off`;
        dayInput.name = "daysOff";
        dayInput.value = day;
        dayInput.className = "mr-2";
        const dayLabel = document.createElement("label");
        dayLabel.htmlFor = dayInput.id;
        dayLabel.className = "text-gray-700";
        dayLabel.innerText = day;
        dayDiv.appendChild(dayInput);
        dayDiv.appendChild(dayLabel);
        daysGrid.appendChild(dayDiv);
    });
    daysOffDiv.appendChild(daysGrid);
    form.appendChild(daysOffDiv);

    const generateButton = document.createElement("button");
    generateButton.type = "button";
    generateButton.className = "w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300";
    generateButton.innerText = "Generate Schedule";
    generateButton.addEventListener("click", generateSchedule);
    form.appendChild(generateButton);

    container.appendChild(form);
    body.appendChild(container);

    const calendarDiv = document.createElement("div");
    calendarDiv.id = "calendar";
    calendarDiv.className = "w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 hidden";
    const calendarTitle = document.createElement("h3");
    calendarTitle.className = "text-2xl font-bold mb-6 text-center text-blue-600";
    calendarTitle.innerText = "Doctor's Monthly Schedule";
    calendarDiv.appendChild(calendarTitle);
    const calendarGrid = document.createElement("div");
    calendarGrid.id = "calendarGrid";
    calendarGrid.className = "grid grid-cols-7 gap-4";
    calendarDiv.appendChild(calendarGrid);
    container.appendChild(calendarDiv);

    function generateSchedule() {
        const doctorName = document.getElementById('doctorName').value;
        const startHour = parseInt(document.getElementById('startHour').value, 10);
        const startMinute = parseInt(document.getElementById('startMinute').value, 10);
        const startPeriod = document.getElementById('startPeriod').value;
        const endHour = parseInt(document.getElementById('endHour').value, 10);
        const endMinute = parseInt(document.getElementById('endMinute').value, 10);
        const endPeriod = document.getElementById('endPeriod').value;

        if (doctorName === '') {
            alert('Please enter the doctor\'s name.');
            return;
        }
        if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) {
            alert('Please enter valid start and end times.');
            return;
        }

        const daysOff = Array.from(document.querySelectorAll('input[name="daysOff"]:checked')).map(input => input.value);
        generateCalendar(doctorName, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod, daysOff);
    }

    function generateCalendar(doctorName, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod, daysOff) {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
    
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
            const dayName = date.toLocaleString('default', { weekday: 'long' });
            const isOff = daysOff.includes(dayName);
    
            const dayDiv = document.createElement('div');
            dayDiv.className = `w-24 h-24 flex flex-col justify-center items-center rounded-lg text-center cursor-pointer ${isOff ? 'bg-red-200' : 'bg-green-200'}`;
    
            // Create bold tag for doctor's name
            const doctorNameTag = document.createElement('b');
            doctorNameTag.textContent = doctorName;
            doctorNameTag.classList.add('mt-2')
            dayDiv.appendChild(doctorNameTag);
    
            // Add line break
            dayDiv.appendChild(document.createElement('br'));
    
            // Append day and day name
            dayDiv.innerHTML += `${dayName}<br>${day}`;
    
            dayDiv.addEventListener('click', function() {
                if (dayDiv.classList.contains('bg-green-200')) {
                    dayDiv.classList.remove('bg-green-200');
                    dayDiv.classList.add('bg-red-200');
                } else {
                    dayDiv.classList.remove('bg-red-200');
                    dayDiv.classList.add('bg-green-200');
                }
            });
            calendarGrid.appendChild(dayDiv);
        }
    
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.classList.remove('hidden');
    }
    
});
