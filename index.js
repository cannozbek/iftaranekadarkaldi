async function fetchCity() {
    const res = await fetch("https://namaz-vakti.vercel.app/api/regions?country=Turkey&city=Ankara");
    const recordCities = await res.json();
    for (x in recordCities) {
        var sel = document.createElement("option");
        sel.innerHTML = recordCities[x];
        document.getElementById("city").appendChild(sel);
    }
}
fetchCity();
document.getElementById("city").addEventListener("change", function () {
    var selectedTag = this;
    var selectedCity = selectedTag.options[selectedTag.selectedIndex].text;

    if (selectedCity != null) {
        async function fetchState() {
            const res = await fetch("https://namaz-vakti.vercel.app/api/cities?country=Turkey&region=" + selectedCity);
            const recordStates = await res.json();

            var stateSelect = document.getElementById("state");
            stateSelect.innerHTML = "";

            for (var i in recordStates) {
                var option = document.createElement("option");
                option.innerHTML = recordStates[i];
                stateSelect.appendChild(option);
            }
        }
        fetchState();
    }
});


const devamEt = document.getElementById("devamEt");
const citySelect = document.getElementById("city");
const stateSelect = document.getElementById("state");

devamEt.addEventListener("click", () => {
    if (citySelect.value === "" || stateSelect.value === "") {
        alert("Lütfen tüm seçenekleri belirleyin.");
        return;
    }
    localStorage.setItem("selectedCity", citySelect.value);
    localStorage.setItem("selectedState", stateSelect.value);
    window.location.href = "mainPage.html";
});




