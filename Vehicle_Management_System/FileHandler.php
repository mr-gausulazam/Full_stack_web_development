
trait FileHandler {
    // Read data from the vehicles.json file
    public function readFromFile($filePath) {
        if (file_exists($filePath)) {
            $data = file_get_contents($filePath);
            return json_decode($data, true);
        }
        return [];
    }

    // Write data to the vehicles.json file
    public function writeToFile($filePath, $data) {
        file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
    }
}
