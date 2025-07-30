import React from "react";
import CardItem from "./CardItem";
export default function ListMovie() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-4 gap-4 ">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
}
