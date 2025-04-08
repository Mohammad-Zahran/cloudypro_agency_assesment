import { Box } from "@mui/material";

interface EmbeddedSpotifyPlayerProps {
  trackId: string;
}

const EmbeddedSpotifyPlayer: React.FC<EmbeddedSpotifyPlayerProps> = ({
  trackId,
}) => {
  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        title={`Spotify player for track ${trackId}`}
      />
    </Box>
  );
};

export default EmbeddedSpotifyPlayer;
