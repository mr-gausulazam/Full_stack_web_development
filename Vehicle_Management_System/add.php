
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $vehicleManager = new VehicleManager('data/vehicles.json');
    $vehicleManager->addVehicle([
        'name' => $_POST['name'],
        'type' => $_POST['type'],
        'price' => $_POST['price'],
        'image' => $_POST['image']
    ]);
    header('Location: index.php');
}
?>
<form method="POST">
    <input type="text" name="name" placeholder="Name" required>
    <input type="text" name="type" placeholder="Type" required>
    <input type="number" name="price" placeholder="Price" required>
    <input type="text" name="image" placeholder="Image URL" required>
    <button type="submit">Add Vehicle</button>
</form>

