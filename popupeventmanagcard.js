document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventModal = document.getElementById('eventModal');
    var closeModal = document.getElementsByClassName('close')[0];
    var eventForm = document.getElementById('eventForm');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'en',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'List'
        },
        editable: true,
        selectable: true,
        events: [
            {
                title: 'Meeting',
                start: '2024-06-10T10:30:00',
                end: '2024-06-10T12:30:00',
                description: 'Important meeting with clients.'
            },
            {
                title: 'Lunch Break',
                start: '2024-06-12T12:00:00'
            },
            {
                title: 'Conference',
                start: '2024-06-15',
                end: '2024-06-17'
            }
        ],
        eventClick: function(info) {
            alert('Event: ' + info.event.title);
            alert('Description: ' + info.event.extendedProps.description);
            info.jsEvent.preventDefault();
        },
        dayCellDidMount: function(info) {
            info.el.addEventListener('click', function() {
                eventModal.style.display = 'block';
                var startDate = info.date.toISOString().slice(0, 16);
                document.getElementById('eventStart').value = startDate;
                document.getElementById('eventEnd').value = startDate;
            });
        }
    });

    calendar.render();

    closeModal.onclick = function() {
        eventModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == eventModal) {
            eventModal.style.display = 'none';
        }
    }

    eventForm.onsubmit = function(e) {
        e.preventDefault();
        var title = document.getElementById('eventTitle').value;
        var start = document.getElementById('eventStart').value;
        var end = document.getElementById('eventEnd').value;
        var description = document.getElementById('eventDescription').value;

        calendar.addEvent({
            title: title,
            start: start,
            end: end,
            description: description
        });

        eventModal.style.display = 'none';
        eventForm.reset();
    }
});
document.querySelector('.close').onclick = function() {
    document.getElementById('eventModal').style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == document.getElementById('eventModal')) {
        document.getElementById('eventModal').style.display = 'none';
    }
}
// To show the modal (for demonstration purposes)
document.getElementById('eventModal').style.display = 'flex';