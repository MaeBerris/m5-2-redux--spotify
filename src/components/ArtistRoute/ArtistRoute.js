import React from "react";
import { useParams } from "react-router-dom";

const ArtistRoute = () => {
  let { id } = useParams();
  return <div>ID : {id}</div>;
};

export default ArtistRoute;
