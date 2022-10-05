import { useEffect, useState } from "react";
import BlockForm from "./BlockForm";
import { searchChildren } from "./redis";

export default function BlockNode(req) {
    const {hit} = req;
    const children = searchChildren(hit.name);
    

    console.log(children)
    return <div>
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
        <>Childrens:</>
        {children.map(child => <>{child.name}</>)}
    </div>
}