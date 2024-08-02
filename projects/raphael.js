src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.11.3/main.min.js"

    // JavaScript to toggle the calendar popup
    document.querySelector('.calendar-btn').addEventListener('click', function() {
        document.querySelector('.calendar-content').classList.toggle('show');
    });

    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        });

        calendar.render();
    });
