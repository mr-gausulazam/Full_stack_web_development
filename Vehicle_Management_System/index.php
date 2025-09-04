
<?php
$vehicleManager = new VehicleManager('data/vehicles.json');
$vehicles = $vehicleManager->getVehicles();
?>
<div class="container">
    <h1>Vehicles</h1>
    <a href="views/add.php" class="btn btn-primary">Add New Vehicle</a>
    <div class="row">
        <?php foreach ($vehicles as $index => $vehicle): ?>
            <div class="col-md-4">
                <div class="card">
                    <img src="<?php echo htmlspecialchars($vehicle['image']); ?>" class="card-img-top" alt="vehicle image">
                    <div class="card-body">
                        <h5 class="card-title"><?php echo htmlspecialchars($vehicle['name']); ?></h5>
                        <p class="card-text">Type: <?php echo htmlspecialchars($vehicle['type']); ?></p>
                        <p class="card-text">Price: $<?php echo htmlspecialchars($vehicle['price']); ?></p>
                        <a href="views/edit.php?id=<?php echo $index; ?>" class="btn btn-warning">Edit</a>
                        <a href="views/delete.php?id=<?php echo $index; ?>" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

