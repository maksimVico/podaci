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

// Dobijanje ukupnog broja poseta ako je parametar 'visits'
$get = isset($_GET['get']) ? $_GET['get'] : '';

if ($get === 'visits') {
    echo getCounter('visits');
}
?>
