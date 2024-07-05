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
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=ad7aaf79190f4684ad889c09ecd83f4d&ip=${ip}`);
        const data = await response.json();
        return `${data.city}, ${data.country_name}`;
    } catch (error) {
        console.error('Greška pri dobijanju geolokacije:', error);
        return 'Nepoznato';
    }
}

// Funkcija za dobijanje informacija o uređaju
function getDeviceInfo() {
    const deviceInfo = {};

    // Detekcija tipa uređaja (desktop, tablet, mobile)
    if (/Android/i.test(navigator.userAgent)) {
        deviceInfo.type = 'Android';
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        deviceInfo.type = 'iOS';
    } else {
        deviceInfo.type = 'Desktop';
    }

    // Detekcija browsera
    const browserInfo = navigator.userAgent.match(/(Firefox|Chrome|Safari|Opera|Edge)\/([\d.]+)/);
    deviceInfo.browser = browserInfo ? `${browserInfo[1]} ${browserInfo[2]}` : 'Nepoznato';

    // Detekcija operativnog sistema
    const osInfo = navigator.platform;
    deviceInfo.os = osInfo ? osInfo : 'Nepoznato';

    // Detekcija CPU informacija
    const cpuInfo = navigator.hardwareConcurrency;
    deviceInfo.cpu = cpuInfo ? `${cpuInfo} cores` : 'Nepoznato';

    // Detekcija RAM informacija
    const memoryInfo = navigator.deviceMemory;
    deviceInfo.memory = memoryInfo ? `${memoryInfo} GB` : 'Nepoznato';

    // Detekcija rezolucije ekrana
    deviceInfo.resolution = `${window.screen.width}x${window.screen.height}`;

    return deviceInfo;
}

// Funkcija za dobijanje informacija o CPU-u
function getCPUInfo() {
    const cpuInfo = {};

    if (navigator.hardwareConcurrency) {
        cpuInfo.cores = navigator.hardwareConcurrency;
    } else {
        cpuInfo.cores = 'Nepoznato';
    }

    if (navigator.cpuClass) {
        cpuInfo.cpuClass = navigator.cpuClass;
    } else {
        cpuInfo.cpuClass = 'Nepoznato';
    }

    if (navigator.platform) {
        cpuInfo.platform = navigator.platform;
    } else {
        cpuInfo.platform = 'Nepoznato';
    }

    return cpuInfo;
}

// Funkcija za dobijanje informacija o GPU-u
async function getGPUInfo() {
    try {
        const gpu = await navigator.gpu;
        if (gpu) {
            return `${gpu.renderer} (${gpu.vendor})`;
        } else {
            return 'Nepoznato';
        }
    } catch (error) {
        console.error('Greška pri dobijanju informacija o GPU-u:', error);
        return 'Nepoznato';
    }
}

// Prikazivanje informacija na stranici
window.onload = async function() {
    const ip = await getIPAddress();
    const location = await getGeolocation(ip);
    const deviceInfo = getDeviceInfo();
    const cpuInfo = getCPUInfo();
    const gpuInfo = await getGPUInfo();

    document.getElementById('ip').innerText = `IP adresa: ${ip}`;
    document.getElementById('location').innerText = `Lokacija: ${location}`;
    document.getElementById('device').innerText = `Uređaj: ${deviceInfo.type}`;
    document.getElementById('browser').innerText = `Browser: ${deviceInfo.browser}`;
    document.getElementById('os').innerText = `OS: ${deviceInfo.os}`;
    document.getElementById('cpu').innerText = `CPU: ${cpuInfo.cores} (${cpuInfo.cpuClass})`;
    document.getElementById('gpu').innerText = `GPU: ${gpuInfo}`;
    document.getElementById('memory').innerText = `RAM: ${deviceInfo.memory}`;
    document.getElementById('resolution').innerText = `Rezolucija: ${deviceInfo.resolution}`;
};
