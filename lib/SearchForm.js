import { useState } from 'react';
import BlockNode from './BlockNode';

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
      console.log(hits);
      if (hits[0]!=undefined) console.log((JSON.parse(hits[0].spaceObjects)));
    }
  };

  return (
    <div>
      <input onChange={search} type="text" />
      <ul>
        { hits.map((hit) => (
          <BlockNode hit = {hit}/>
          ))}
      </ul>
    </div>
  );
}