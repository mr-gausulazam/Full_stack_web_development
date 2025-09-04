
class VehicleManager extends VehicleBase implements VehicleActions {
    use FileHandler;

    private $filePath;

    public function __construct($filePath) {
        parent::__construct("", "", "", ""); // Constructor for base class
        $this->filePath = $filePath;
    }

    public function addVehicle($data) {
        $vehicles = $this->getVehicles();
        $vehicles[] = $data;
        $this->writeToFile($this->filePath, $vehicles);
    }

    public function editVehicle($id, $data) {
        $vehicles = $this->getVehicles();
        if (isset($vehicles[$id])) {
            $vehicles[$id] = $data;
            $this->writeToFile($this->filePath, $vehicles);
        }
    }

    public function deleteVehicle($id) {
        $vehicles = $this->getVehicles();
        if (isset($vehicles[$id])) {
            unset($vehicles[$id]);
            $this->writeToFile($this->filePath, array_values($vehicles)); // Re-index after delete
        }
    }

    public function viewVehicle($id) {
        $vehicles = $this->getVehicles();
        return isset($vehicles[$id]) ? $vehicles[$id] : null;
    }

    public function getVehicles() {
        return $this->readFromFile($this->filePath);
    }

    public function getDetails() {
        return "Name: $this->name, Type: $this->type, Price: $this->price, Image: $this->image";
    }
}
