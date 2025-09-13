import React from 'react';

const Fruites = () => {
    let fruits = ['Apple', 'Mango', 'Banana', 'Grapes', 'Orange'];
  return (
    <div>
      <ul>
        {fruits.map((item, key) => (
            <li key={key}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Fruites;
