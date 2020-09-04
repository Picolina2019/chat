import React from 'react';
import Snippet from './Snippet';
import './App.css';

export default function ChatZone({ history }) {
  return (
    <div className='innerShadow'>
      <div className='chatWrap'>
        {history.map((item, index) => (
          <Snippet key={index} index={index} item={item} />
        ))}
      </div>
    </div>
  );
}
