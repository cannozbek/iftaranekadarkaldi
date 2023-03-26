async function fetchData() {
    var date = new Date();

    const formatdate = formatDate(date);

    const citySelect = localStorage.getItem("selectedCity");
    const stateSelect = localStorage.getItem("selectedState");


    const res = await fetch("https://namaz-vakti.vercel.app/api/timesFromPlace?country=Turkey&region=" + citySelect + "&city=" + stateSelect + "&date=" + formatdate + "&days=1&timezoneOffset=180");
    const record = await res.json();

    const prayerTimes = record.times[formatdate];
    const getTimeAksam = prayerTimes[4];

    const getTimeHoursAksam = getTimeAksam.toString().slice(0, 2);
    const getTimeMinutesAksam = getTimeAksam.toString().slice(3, 5);

    const timeAksam = new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDay().toString(), getTimeHoursAksam, getTimeMinutesAksam, "59").getTime();

    const getTimeSabah = prayerTimes[0];

    const getTimeHoursSabah = getTimeSabah.toString().slice(0, 2);
    const getTimeMinutesSabah = getTimeSabah.toString().slice(3, 5);

    const timeSabah = new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDay().toString(), getTimeHoursSabah, getTimeMinutesSabah, "59").getTime();


    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        if (now > timeAksam) {
            var distance = timeSabah - now;
        }
        else {
            var distance = timeAksam - now;
        }

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = benimFormat(hours) + ":"
            + benimFormat(minutes) + ":" + benimFormat(seconds);

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);


    function benimFormat(input3) {
        if (input3 != 0) {
            var count = 0;
            n = input3;
            if (n >= 1) ++count;

            while (n / 10 >= 1) {
                n /= 10;
                ++count;
            }
            if (count > 1) return (input3);
            if (count == 1) return ('0' + input3);
        }
        return ('0' + input3);
    }



}
fetchData();



function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
