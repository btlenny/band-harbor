import { useEffect, useState } from "react";
import axios from "axios";

function Spotify() {
  const CLIENT_ID = "bfe4c1997a2394f2aae65666f9677b48d";
  const REDIRECT_URI = "http://localhost:3001/spotify";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      const tokenExpiration = Math.floor(Date.now() / 1000) + 3600; // Assuming a 1-hour expiration
      window.localStorage.setItem("token", storedToken);
      window.localStorage.setItem("tokenExpiration", tokenExpiration);
    }

    setToken(storedToken);
    console.log("Token:", storedToken);
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = window.localStorage.getItem("refreshToken");
      const { data } = await axios.post(
        "YOUR_REFRESH_TOKEN_ENDPOINT", // Replace with your server endpoint to refresh tokens
        {
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }
      );

      const newAccessToken = data.access_token;
      const newExpirationTime = Math.floor(Date.now() / 1000) + data.expires_in;

      window.localStorage.setItem("token", newAccessToken);
      window.localStorage.setItem("tokenExpiration", newExpirationTime);

      setToken(newAccessToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const searchArtists = async (e) => {
    e.preventDefault();

    try {
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (!tokenExpiration || currentTime >= tokenExpiration) {
        // Token expired, handle token refresh here
        console.log("Token expired, refreshing...");
        await refreshToken();
      }

      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });

      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching artists:", error);
    }
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const getRecommendations = async (artistId) => {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            seed_artists: artistId,
            limit: 5, // Adjust as needed
          },
        }
      );

      setRecommendations(data.tracks);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  const handleArtistSelection = (artist) => {
    setSelectedArtist(artist);
    getRecommendations(artist.id);
  };

  const renderRecommendations = () => {
    return recommendations.map((track) => (
      <div key={track.id}>
        {track.album.images.length ? (
          <img width={"100%"} src={track.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {track.name} - {track.artists.map((artist) => artist.name).join(", ")}
      </div>
    ));
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id} onClick={() => handleArtistSelection(artist)}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
          <>
            <form onSubmit={searchArtists}>
              <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
              <button type={"submit"}>Search</button>
            </form>

            {artists.length > 0 && (
              <>
                <h2>Artists</h2>
                {renderArtists()}
              </>
            )}

            {selectedArtist && (
              <>
                <h2>Recommendations for {selectedArtist.name}</h2>
                {renderRecommendations()}
              </>
            )}
          </>
        ) : (
          <h2>Please login</h2>
        )}
      </header>
    </div>
  );
}

export default Spotify;
