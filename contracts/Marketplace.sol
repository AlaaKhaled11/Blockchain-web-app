pragma solidity <=0.5.0;

contract Marketplace {
    string public name;
    uint256 public productCount = 0;
    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string Address;
        string plates;
        string VIN;
        string engineno;
        address payable owner;
        bool forSale;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        string Address,
        string plates,
        string VIN,
        string engineno,
        address payable owner,
        bool forSale
    );

    event ProductTransfered(
        uint256 id,
        address payable owner
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        string Address,
        string plates,
        string VIN,
        string engineno,
        address payable owner,
        bool forSale
    );

    event AddToStore(
        uint256 id,
        bool forSale
    );

    event RemoveFromStore(
        uint256 id,
        bool forSale
    );

    constructor() public {
        name = "Alaa Khaled Ownership grad project";
    }

    function createProduct(string memory _name, uint256 _price, string memory _Address, string memory _plates, string memory _VIN, string memory _engineno, address payable owner) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        require(bytes(_Address).length > 0);
        require(bytes(_plates).length > 0);
        require(bytes(_VIN).length > 0);
        require(bytes(_engineno).length > 0);
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            _Address,
            _plates,
            _VIN,
            _engineno,
            owner,
            false
        );
        emit ProductCreated(productCount, _name, _price, _Address, _plates, _VIN, _engineno, owner, false);
    }

    function transferOwnership(uint256 _id, address payable buyer) public payable {
        // Fetch the product
        products[_id].owner = buyer;

        emit ProductTransfered(_id, buyer);
    }

    function purchaseProduct(uint256 _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure that product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        // require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Require car to be for sale
        require(_product.forSale == true);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.forSale = false;
        // Update the product
        products[_id] = _product;
        // Py the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.price,
            _product.Address,
            _product.plates,
            _product.VIN,
            _product.engineno,
            msg.sender,
            false
        );
    }

    function addToStore(uint256 _id) public payable {
        products[_id].forSale = true;
        emit AddToStore(
            _id,
            true
        );
    }
    
    function removeFromStore(uint256 _id) public payable {
        products[_id].forSale = false;
        emit RemoveFromStore(
            _id,
            true
        );
    }
}

