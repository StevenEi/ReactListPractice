import Header from "./Header";
import SearchItem from "./SearchItem";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  // url for the items from the backend
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        // sets the fetch error back to null if there was an error before
        setFetchError(null);
      } catch (err) {
        setFetchError(err.stack);
      } finally {
        setIsLoading(false);
      }
    };
    // set timeout is used to simulate loading data from a server
    setTimeout(() => {
      fetchItems();
    }, 1500);
  }, []);

  const addItem = async (item) => {
    // if there's an item, set the ID of that item to the last item's ID + 1. If no ID, give it an ID of 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const theNewItem = { id, checked: false, item };
    const listItems = [...items, theNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // checked status of request will be equal to the item we're filtering
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    // need to add the specific ID of the selected item on to the API URL for PATCH and DELETE
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    // no headers for the delete request because there's no content-type?
    const deleteOptions = { method: "DELETE" };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;

    // clears the input field after submitting the new item
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch}></SearchItem>
      <main>
        {/* In JSX, && means: "if isLoading is true, then (following code)" */}
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
