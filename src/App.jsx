import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue} from "firebase/database";
import firebaseConfig from "./firebase.config";
import { useState, useEffect } from 'react';
import GroceryListItem from "./components/GroceryListItem/GroceryListItem";
import './App.css';

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function App() {  
  const [groceryList, setGroceryList] = useState([]);  

  function updateGroceryList(id) {    
    const updatedGroceryList = groceryList.map(item => {          
      if (id === item.id) {        
        return {...item, isCancelled: !item.isCancelled}
      }
      return item;
    });
    setGroceryList(updatedGroceryList);  
    this.setLimit();    
   }

  function applyGroceryListChanges() {
    groceryList.forEach(item => {           
           
      if (item.isCancelled)  {
        set(ref(db, 'items/' + item.id), null)
        .then(() => {
          console.log('success');
        })
        .catch((error) => {
          console.log(error);
        });
        
      }
    });
  }

  function createGroceryList(data) {
    return Object.entries(data).map(item => {
      const [id, value] = item;
      return {
        id, 
        value,
        isCancelled: false
      }
    });
  }

  useEffect(() => {
    const items = ref(db, 'items/');
    onValue(items, (snapshot) => {
      const data = snapshot.val();              
      setGroceryList(createGroceryList(data));
    });
  }, [setGroceryList]);

  return (
    <div className="App">
     <ul className="shopping-list__wrapper">       
          {groceryList.map(item => {              
              console.log(item);
              return <GroceryListItem key={item.id} id={item.id} value={item.value} isCancelled={item.isCancelled} onUpdate={updateGroceryList}/>;
            })            
          }
        </ul>

        <div onClick={applyGroceryListChanges} className="completed-btn">Remove completed items</div>
    </div>
  )
}

export default App
