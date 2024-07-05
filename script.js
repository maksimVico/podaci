// Funkcija za dobijanje IP adrese
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Greška pri dobijanju IP adrese:', error);
        return 'Nepoznato';
    }
}

// Funkcija za dobijanje geolokacije na osnovu IP adrese
async function getGeolocation(ip) {
    const apiKey = 'ad7aaf79190f4684ad889c09ecd83f4d'; // Vaš API ključ za IPGeolocation.io
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return `${data.city}, ${data.country_name}`;
    } catch (error) {
        console.error('Greška pri dobijanju geolokacije:', error);
        return 'Nepoznato';
    }
}

// Funkcija za dobijanje User-Agent podataka
function getUserAgent() {
    return navigator.userAgent;
}

// Prikazivanje informacija na stranici
window.onload = async function() {
    const ip = await getIPAddress();
    const userAgent = getUserAgent();
    const location = await getGeolocation(ip);

    document.getElementById('ip').innerText = `IP adresa: ${ip}`;
    document.getElementById('device').innerText = `Uređaj: ${userAgent}`;
    document.getElementById('location').innerText = `Lokacija: ${location}`;
};
