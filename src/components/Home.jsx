import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    likes: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //Handle like updates
  const handleUpdate = (id, likes) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        const updatedProducts = products.map((product) => {
          if (product.id === id) return updatedProduct;

          return product;
        });

        setProducts(updatedProducts);
      });
  };

  //Handle creation of product
  const handleCreate = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => setProducts([...products, data]));
  };

  //Handle input change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      });
  };

  return (
    <div>
      <ul className="flex flex-col gap-10">
        {products.map(({ id, name, likes }) => (
          <div key={id} className="flex items-center gap-5">
            <li>
              {name} - {likes} likes
            </li>
            {/* Update product*/}
            <button
              onClick={() => handleUpdate(id, likes)}
              className="bg-blue-600"
            >
              Add likes
            </button>
            {/* Delete product*/}
            <button className="bg-red-600" onClick={() => handleDelete(id)}>
              Delete product
            </button>
          </div>
        ))}
      </ul>
      {/* Create a product */}
      <div class="w-full max-w-xs mt-10">
        <form
          onSubmit={handleCreate}
          class="border border-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="name">
              Product
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Enter the product name"
              value={newProduct.name}
              onChange={handleChange}
            />
          </div>
          <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="likes">
              Likes
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="likes"
              type="number"
              name="likes"
              placeholder="Enter the number of likes"
              value={newProduct.likes}
              onChange={handleChange}
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
