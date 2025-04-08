import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { access_token, Album, Tracks } from "../types/types";
import LoadingSpinner from "../components/LoadingSpinner";
import EmbeddedSpotifyPlayer from "../components/Details_View_Components/EmbeddedSpotifyPlayer";
import AlbumCard from "../components/Details_View_Components/AlbumCard";
import BackButton from "../components/Details_View_Components/BackButton";

const DetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = access_token;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get<Album>(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbum(response.data);
      } catch (err) {
        setError("Failed to fetch album details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get<{ items: Tracks[] }>(
          `https://api.spotify.com/v1/albums/${id}/tracks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTracks(response.data.items);
      } catch (err) {
        setError("Failed to fetch tracks.");
      }
    };

    fetchTracks();
  }, [id]);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const handleTrackClick = (trackUri: string, trackName: string) => {
    navigate("/player", {
      state: { token, trackUri, trackName },
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!album) return <Typography>No album found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
      {/* Album Card */}
      <AlbumCard album={album} />

      {/* Track List */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Track List
      </Typography>

      {tracks.length === 0 ? (
        <Typography>No tracks available.</Typography>
      ) : (
        <List disablePadding>
          {tracks.map((track, index) => (
            <ListItem
              key={track.id}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                mb: 3,
                borderBottom: "1px solid #ddd",
                pb: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    onClick={() => handleTrackClick(track.uri, track.name)}
                    sx={{
                      cursor: "pointer",
                      fontWeight: 500,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {index + 1}. {track.name}
                  </Typography>
                }
                secondary={`Duration: ${formatDuration(track.duration_ms)}`}
              />

              {/* Audio Preview */}
              {track.preview_url ? (
                <Box sx={{ width: "100%", mt: 1 }}>
                  <audio controls style={{ width: "100%" }}>
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              ) : (
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mt: 1, fontStyle: "italic" }}
                >
                  No preview available
                </Typography>
              )}

              {/* Embedded Spotify Player */}
              <Box sx={{ mt: 2, width: "100%" }}>
                <EmbeddedSpotifyPlayer trackId={track.id} />
              </Box>

              {/* External Spotify Link */}
              {track.external_urls?.spotify && (
                <Button
                  variant="outlined"
                  size="small"
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  🎧 Listen on Spotify
                </Button>
              )}

              {/* Premium-only message */}
              {!track.preview_url && (
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mt: 1, fontStyle: "italic" }}
                >
                  Full track available only for Premium users.
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      )}

      {/* Back Button */}
      <BackButton />
    </Box>
  );
};

export default DetailsView;
