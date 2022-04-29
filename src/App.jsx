import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";
import firebaseConfig from "./firebase.config";
import { useState, useEffect } from 'react';
import GroceryListItem from "./components/GroceryListItem/GroceryListItem";
import './App.css';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function App() {  
  const [groceryList, setGroceryList] = useState([]);  

  useEffect(() => {
    const items = ref(db, 'items/');
    onValue(items, (snapshot) => {
      const data = snapshot.val();      
      setGroceryList(Object.values(data));
    });
  }, [setGroceryList]);

  return (
    <div className="App">
     <ul className="shopping-list__wrapper">
          {groceryList
            .map((name, index) => {
              return <GroceryListItem key={index} name={name}/>;
            })            
          }
        </ul>

        <button onClick="updateList">Update</button>
    </div>
  )
}

export default App
