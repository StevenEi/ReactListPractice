import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import AddItem from "./AddItem"
import { useState } from "react"

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Almonds"
    },
    {
      id: 2,
      checked: false,
      item: "CAPN CRONCH"
    },
    {
      id: 3,
      checked: false,
      item: "carrot"
    }
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems))
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem("shoppinglist", JSON.stringify(listItems))
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem/>
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;