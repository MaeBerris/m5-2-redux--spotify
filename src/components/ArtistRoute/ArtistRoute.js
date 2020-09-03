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
import styled from "styled-components";

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
    <Wrapper>
      <Header>
        <Avatar src={currentArtist.profile.images[1].url} />
        <Title>{currentArtist.profile.name}</Title>
      </Header>
      <Followers>
        {approximateNumber(currentArtist.profile.followers.total)}
        <Span> followers</Span>
      </Followers>
      <TagsSection>tags</TagsSection>
      <Tags>
        {slicedArray.map((item) => {
          return <SingleTag key={item}>{item}</SingleTag>;
        })}
      </Tags>
    </Wrapper>
  );
};

export default ArtistRoute;

const Wrapper = styled.div`
  background: #0b0f14;
  padding-top: 60px;
  display: flex;
  align-items: center;
  height: 100vh;
  color: white;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
`;

const Followers = styled.p`
  color: #ff4fd8;
  font-size: 14px;
  line-height: 17px;
  margin: 0;
  font-weight: 800;
`;

const Span = styled.span`
  color: white;
  font-size: 14px;
  line-height: 17px;
  margin: 0;
  font-weight: 500;
`;

const TagsSection = styled.h2`
  font-size: 21px;
  line-height: 26px;
  margin-top: 75px;
  margin-bottom: 21;
`;

const Tags = styled.ul`
  text-decoration: none;
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const SingleTag = styled.li`
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
  color: white;
  padding: 8px 21px;
  font-size: 11px;
  &:first-child {
    margin-right: 10px;
  }
`;
