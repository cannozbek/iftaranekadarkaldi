async function fetchData() {
    const res = await fetch("https://api.aladhan.com/v1/timingsByCity/26-03-2023?city=Ankara&country=Turkey&method=13");
    const record = await res.json();

    const getTimeAksam = record.data.timings.Maghrib;
    const getTimeHoursAksam = getTimeAksam.toString().slice(0, 2);
    const getTimeMinutesAksam = getTimeAksam.toString().slice(3, 5);

    const timeAksam = new Date(record.data.date.gregorian.year, record.data.date.gregorian.month.number - 1, record.data.date.gregorian.day, getTimeHoursAksam, (parseInt(getTimeMinutesAksam) + 6), "59").getTime();

    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = timeAksam - now;

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