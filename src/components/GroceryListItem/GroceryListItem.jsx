import { useState, useEffect } from 'react';

function GroceryListItem({name}) {
    const [isSelected, setIsSelected] = useState(false);

    function handleSelectChange() {
        setIsSelected(!isSelected);
    }

    return (
        <li onClick={handleSelectChange} className={isSelected ? 'shopping-list__item text-strike' : 'shopping-list__item'}>
            {name}
            {/* <input
                  name="isSelected"
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleSelectChange} /> */}
        </li>
    )
}

export default GroceryListItem