import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect, useState } from "react";

const PlayerView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [player, setPlayer] = useState<any>(null);

  // Extract data from state passed through navigation
  const { token, trackUri, trackName } = location.state || {};

  useEffect(() => {
    if (!token) return;

    // Check if the user has a premium account
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.product === "premium") {
          setIsPremium(true);
        } else {
          setIsPremium(false);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Initialize the Spotify Web Playback SDK
    const onSpotifyWebPlaybackSDKReady = () => {
      if (window.Spotify) {
        const spotifyPlayer = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => cb(token),
          volume: 0.5,
        });

        spotifyPlayer.connect().then(() => {
          setPlayer(spotifyPlayer);
        });
      }
    };

    // Load the SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.onload = onSpotifyWebPlaybackSDKReady;
    document.body.appendChild(script);
  }, [token]);

  if (!trackUri || !token) {
    return (
      <Typography color="error">
        Invalid track data or token missing.
      </Typography>
    );
  }

  if (isPremium === false) {
    return (
      <Box
        sx={{
          p: 3,
          maxWidth: 600,
          mx: "auto",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" gutterBottom>
          You need a Premium account to use this feature.
        </Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  const handlePlay = () => {
    if (player) {
      player.resume();
    }
  };

  const handlePause = () => {
    if (player) {
      player.pause();
    }
  };

  const handleSkip = () => {
    if (player) {
      player.skipToNext();
    }
  };

  const handlePrevious = () => {
    if (player) {
      player.skipToPrevious();
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, borderRadius: 2 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Now Playing: {trackName}
          </Typography>

          <SpotifyPlayer
            token={token}
            uris={[trackUri]}
            autoPlay={true}
            callback={(state) => {
              if (state.isPlaying) {
                console.log("Playing:", state.track.name);
              }
            }}
          />
        </CardContent>

        <CardActions
          sx={{ justifyContent: "center", gap: 2, paddingBottom: 3 }}
        >
          <Button variant="contained" onClick={handlePrevious} size="large">
            Previous
          </Button>
          <Button variant="contained" onClick={handlePlay} size="large">
            Play
          </Button>
          <Button variant="contained" onClick={handlePause} size="large">
            Pause
          </Button>
          <Button variant="contained" onClick={handleSkip} size="large">
            Skip
          </Button>
        </CardActions>

        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PlayerView;
