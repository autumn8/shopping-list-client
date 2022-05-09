import { useState, useEffect } from 'react';

function GroceryListItem({id, value, isCancelled, onUpdate}) {
    

    function onClick() {        
        onUpdate(id);
    }

    return (
        <li onClick={onClick} className={isCancelled ? 'shopping-list__item text-strike': 'shopping-list__item'  }>
            {value.name}           
            {/* <input
                  name="isSelected"
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleSelectChange} /> */}
        </li>
    )
}

export default GroceryListItem