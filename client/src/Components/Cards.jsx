import React from "react";
import Card from "./Card";
import './Cards.css';

export default function Cards({recipes}){
    return (
        <div className = 'cards'>
          {recipes.map(r => <Card
              key={r.id}
              id={r.id}
              title={r.title}
              summary={r.summary}
              image={r.image}
            /> )}
        </div>
      );
}