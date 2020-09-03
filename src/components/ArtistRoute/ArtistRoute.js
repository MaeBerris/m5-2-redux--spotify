import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistProfile,
  receiveArtistProfile,
  receiveArtistProfileError,
} from "../../action";
import { useDispatch } from "react-redux";
import approximateNumber from "approximate-number";

const ArtistRoute = () => {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const {
    artists: { currentArtist, status },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  let slicedArray = [];
  if (currentArtist !== null) {
    slicedArray = currentArtist.profile.genres.slice(0, 2);
  }

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistProfile());
    fetchArtistProfile(accessToken, id)
      .then((data) => {
        dispatch(receiveArtistProfile(data));
      })
      .catch((err) => {
        dispatch(receiveArtistProfileError());
      });
  }, [accessToken]);

  if (status === "loading" || currentArtist === null) {
    return <div>loading</div>;
  }

  return (
    <div>
      <header>
        <img src={currentArtist.profile.images[1].url} />
        <h1>{currentArtist.profile.name}</h1>
      </header>
      <p>{approximateNumber(currentArtist.profile.followers.total)}</p>
      <h2>Tags</h2>
      <ul>
        {slicedArray.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default ArtistRoute;
