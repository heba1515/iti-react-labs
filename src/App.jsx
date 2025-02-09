import { useState } from 'react'
import './App.css'
import SearchBar from "./components/SearchBar";
import ItemCard from "./components/ItemCard";

function App() {
  const [items, setItems] = useState([
    { id: 1, title: "Product 1", price: 123, imageUrl: "/src/assets/product-img1.webp" },
    { id: 2, title: "Product 2", price: 456, imageUrl: "/src/assets/product-img2.jpg" },
    { id: 3, title: "Product 3", price: 789, imageUrl: "/src/assets/product-img3.jpg" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  function updatePrice(id, newPrice) {
    let itemsList = structuredClone(items)
    let item = itemsList.find(item => item.id === id)
    item.price = newPrice
    setItems(itemsList)
  };

  function deleteItem(id) {
    let itemsList = structuredClone(items)
    itemsList = itemsList.filter((item) => item.id !== id)
    setItems(itemsList)
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container py-4">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
        <div className="row mt-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <ItemCard
                item={item}
                onUpdatePrice={updatePrice}
                onDelete={deleteItem}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
