<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ERROR | E_PARSE);
include 'config_db.php';

if ($_POST["action"] == "delete") {
    $sql = 'DELETE FROM isletmeler where isletme_id ="' . $_POST["isletme_id"] . '"';
    $result = $conn->query($sql);
    $jsonArray  = $result;
}

if ($_POST["action"] == "add") {
    $sql = 'INSERT INTO isletmeler (isletme_adi, isletme_adres, isletme_sabit_tel, isletim_web_adresi, kategori, calisma_saatler, og_indirim, 
    harita_adresi, harita_embed, resmi_website, hak_adresi) values ("' . $_POST["isletme_adi"] . '","' . $_POST["isletme_adres"] . '", "' . $_POST["isletme_sabit_tel"] . '",
    "' . $_POST["isletim_web_adresi"] . '", "' . $_POST["kategori"] . '", "' . $_POST["calisma_saatler"] . '", "' . $_POST["og_indirim"] . '", "' . $_POST["harita_adresi"] . '",
    "' . $_POST["harita_embed"] . '", "' . $_POST["resmi_website"] . '", "' . $_POST["hak_adresi"] . '")';
    $result = $conn->query($sql);
    $jsonArray  = $result;
}

if ($_GET["action"] == "list") {
    $sql = "SELECT  isletme_id, isletme_adi, isletme_adres, isletme_sabit_tel, isletim_web_adresi, kategori, calisma_saatler, og_indirim, 
    harita_adresi, harita_embed, resmi_website, hak_adresi FROM isletmeler";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {
            $alls[] = $row;
        }
        $jsonArray = $alls;
    } else {
        echo "0 results";
    }
    $conn->close();
}
if ($_POST["action"] == "update") {
    $sql = "update isletmeler set isletme_adi = '" . $_POST['isletme_adi'] . "', isletme_adres = '" . $_POST['isletme_adres'] . "',
    isletme_sabit_tel = '" . $_POST['isletme_sabit_tel'] . "', isletim_web_adresi = '" . $_POST['isletim_web_adresi'] . "', 
    kategori = '" . $_POST['kategori'] . "', calisma_saatler = '" . $_POST['calisma_saatler'] . "', og_indirim = '" . $_POST['og_indirim'] . "',
    harita_adresi = '" . $_POST['harita_adresi'] . "',  harita_embed = '" . $_POST['harita_embed'] . "', resmi_website = '" . $_POST['resmi_website'] . "', 
    hak_adresi = '" . $_POST['hak_adresi'] . "' WHERE isletme_id = '" . $_POST['isletme_id'] . "'";
    $result = $conn->query($sql);
    $jsonArray  = $result;
}

// "SELECT *  FROM isletmeler where isletme_adi like '%".$_GET['searchtext']."%' ";
//"SELECT *  FROM isletmeler where isletme_id=".$_GET['id'];
//"SELECT isletme_adi  FROM isletmeler";



//SetHeader(200);
echo json_encode($jsonArray);
