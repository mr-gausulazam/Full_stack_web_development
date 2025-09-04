
abstract class VehicleBase {
    protected $name;
    protected $type;
    protected $price;
    protected $image;

    public function __construct($name, $type, $price, $image) {
        $this->name = $name;
        $this->type = $type;
        $this->price = $price;
        $this->image = $image;
    }

    // Abstract method to be implemented by subclass
    abstract public function getDetails();
}
