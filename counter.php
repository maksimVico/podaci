<?php
session_start();

// Funkcija za povećavanje broja poseta
function increaseCounter($key) {
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = 0;
    }
    $_SESSION[$key]++;
}

// Funkcija za dobijanje broja poseta ili trenutnog broja posetilaca
function getCounter($key) {
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = 0;
    }
    return $_SESSION[$key];
}

// Povećavanje broja poseta
increaseCounter('visits');

// Dobijanje parametra za dobijanje broja
$get = $_GET['get'];

// Dobijanje ukupnog broja poseta
if ($get === 'visits') {
    echo getCounter('visits');
}
?>
