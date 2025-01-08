import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productInput, setProductInput] = useState("");
  const [foundProduct, setFoundProduct] = useState<Product | undefined>(
    undefined
  );
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    let found = products.find((product) =>
      product.name.toLowerCase().includes(productInput.toLocaleLowerCase())
    );
    if (found) {
      setShowErrorMessage(false);
      setFoundProduct(found);
    } else {
      setFoundProduct(undefined);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="product-card">
      <form className="search-section" onSubmit={search}>
        <label htmlFor="product">Enter Product Name:</label>
        <input
          type="text"
          id="product"
          onChange={(e) => setProductInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showErrorMessage && (
        <p className="error">No product found with the given name.</p>
      )}
      {foundProduct && (
        <div className="results-section">
          <div className="product-info">
            <img
              className="product-image"
              src={foundProduct.image}
              alt={foundProduct.name}
            />
            <div className="product-details">
              <p>ID: {foundProduct.id}</p>
              <p>Name: {foundProduct.name}</p>
              <p>Price: {foundProduct.price}</p>
              <p>Category: {foundProduct.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
