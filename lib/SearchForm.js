import { useState } from 'react';

export default function BlockForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result);
      setHits(result["blocks"]);
    }
  };

  return (
    <div>
      <input onChange={search} type="text" />
      <ul>
        { hits.map((hit) => (
            <li key={hit.entityId}>
            Block
              Name:{hit.name}<br/> 
              Type:{hit.type}<br/> 
              Connector:{hit.connector}<br/> 
            </li>
          ))}
      </ul>
    </div>
  );
}