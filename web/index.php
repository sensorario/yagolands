<?php

require_once '../vendor/autoload.php';

use Symfony\Component\Yaml\Yaml;
use Yago\Building;
use Yago\BuildingTree;
use Yago\Configuration;
use Yago\DataLayer;
use Yago\Json;
use Yago\Player;
use Yago\Status;

session_start();

date_default_timezone_set('UTC');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $yaml = file_get_contents('../app/config/buildings.yml');
    $conf = Yaml::parse($yaml);

    foreach($conf['buildings']['resources'] as $building => $resourcess) {
        if ($_SERVER['REQUEST_URI'] == '/' . $building) {
            $buildingValue = Building::box($resourcess);
            setcookie('building-in-progress', $building);
            $secondsToBuildBuilding = $buildingValue->secondsToBuild();
            $dateTimeModifier = "+{$secondsToBuildBuilding} seconds";
            $buildingBuiltAt = (new DateTime($dateTimeModifier))
                ->setTimezone(new DateTimezone('UTC'))
                ->format('Y-m-dTH:i:s');
            setcookie('building-built-at', $buildingBuiltAt);
            Header("HTTP/1.1 301 Moved Permanently");
            Header("Location: http://localhost:8000");
        }
    }
}

if ($_SERVER['REQUEST_URI'] == '/status') {
    echo Json::toJson();
    die;
}

if ($_SERVER['REQUEST_URI'] == '/logout') {
    foreach($_COOKIE as $key => $value) {
        setcookie($key, null);
    }

    Header("HTTP/1.1 301 Moved Permanently");
    Header("Location: http://localhost:8000");
}

if ($_SERVER['REQUEST_URI'] == '/village' && isset($_POST['village-name'])) {
    $villageName = $_POST['village-name'];
    setcookie('village', $villageName);
    Header("HTTP/1.1 301 Moved Permanently");
    Header("Location: http://localhost:8000");
}


if ($_SERVER['REQUEST_URI'] == '/login' && isset($_POST['username'])) {
    $usernameIsCorrect = 'sensorario' == $_POST['username'];
    $passwordIsCorrect = 'sensorario' == $_POST['password'];
    if ($passwordIsCorrect && $usernameIsCorrect) {
        setcookie('username', $_POST['username'], time()+3600);
        Header("HTTP/1.1 301 Moved Permanently");
        Header("Location: http://localhost:8000");
    }
}

?>


<?php
$yaml = file_get_contents('../app/config/twig.yml');
$conf = Yaml::parse($yaml);

$twigConfig = $conf['twig']['cache'] == true
    ? ['cache' => __DIR__ . '/app/cache']
    : [];

$twig = new Twig_Environment(
    new Twig_Loader_Filesystem(
        __DIR__ . '/../templates',
        $twigConfig
    )
);
?>


<?php if ($_SERVER['REQUEST_URI'] == '/') { ?>
<?php echo $twig->render('base.twig', [
    'cookie' => $_COOKIE,
    'dataLayer' => new DataLayer(),
    'buildingTree' => new BuildingTree(
        new Configuration(),
        new Player(
            new DataLayer()
        )
    )
]); ?>
<?php } ?>


<?php if (!isset($_COOKIE['username']) && $_SERVER['REQUEST_URI'] == '/login') { ?>
<?php echo $twig->render('login.twig', [
    'cookie' => $_COOKIE
]); ?>
<?php } ?>


<?php if(isset($_ENV['debug'])) { ?>
    cookie:
    <?php var_dump($_COOKIE); ?>

    post:
    <?php var_dump($_POST); ?>

    server:
    <?php var_dump($_SERVER); ?>
<?php } ?>
