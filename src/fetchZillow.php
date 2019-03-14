<?php
include "API_TOKEN.php";
$zillowURL = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=";
$userInput = file_get_contents('php://input');
$url = $zillowURL . $api . $userInput;
echo(file_get_contents($url));
?>
