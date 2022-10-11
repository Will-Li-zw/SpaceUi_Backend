import { useState } from 'react';
import {message} from 'antd'

export default function BlockForm() {
  const [hits, setHits] = useState([]);
  const [children, setChildren] = useState([]);


  const search = async (event) => {
    const q = event.target.value;
    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/search?' + params);
      const result = await res.json();
      console.log(result);
      setHits(result["blocks"]);
      console.log(hits);
      if (hits[0]!=undefined) console.log((JSON.parse(hits[0].spaceObjects)));
    }
  };
  const searchC = async (q) => {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/searchChildren?' + params);
      const result = await res.json();
      setChildren(result["blocks"]);
  };
  const deleteB = async (q) => {
    const params = new URLSearchParams({ q });
    const res = await fetch('/api/deleteBlock?' + params);
    const result = await res.json();
    setChildren(result["blocks"]);
    setHits([]);
    message
      .loading('Action in progress..', 1.0)
      .then(() => message.success('Delete Block finished', 1.0));
};

  return (
    <div>
      <input onChange={search} type="text" />
      <ul>
        { hits.map((hit) => (
          <>
          <li key={hit.entityId}>
            Block
              Name:{hit.name}<br/> 
              Type:{hit.type}<br/> 
              Connector:{hit.connector}<br/> 
              {/* Car Number:{hit.carNumber}<br/> 
              Bike Number:{hit.bikeNumber}<br/> 
              People Number:{hit.peopleNumber}<br/>  */}
              Parent Block:{hit.parentBlock}<br/> 
              {/* Child Block: {hit.spaceObjects}<br/> */}
            </li>
            <button onClick={()=>searchC(hit.name)} >show children</button>
            <button onClick={()=>deleteB(hit.name)} >Delete Block</button>
          </>
            
          ))}
      </ul>
      {children!=undefined??children.map(child=>child.name+", ")}
    </div>
  );
}