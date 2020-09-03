import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ArtistRoute = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  return (
    <div>
      ID : {id}
      Token : {accessToken}
    </div>
  );
};

export default ArtistRoute;
