import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Album } from "../../types/types";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Card sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid>
          <CardMedia
            component="img"
            image={album.images[0].url}
            alt={album.name}
            sx={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Grid>
        <Grid>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {album.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Release Date: {album.release_date}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Total Tracks: {album.total_tracks}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AlbumCard;
