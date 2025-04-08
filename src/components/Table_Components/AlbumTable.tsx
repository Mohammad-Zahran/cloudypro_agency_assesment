import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Album } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";

interface AlbumTableProps {
  albums: Album[];
  columns: GridColDef[];
  totalRows: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  loading: boolean;
}

const AlbumTable = ({
  albums,
  columns,
  totalRows,
  page,
  pageSize,
  onPageChange,
  loading,
}: AlbumTableProps) => {
  const rows = albums.map((album) => ({
    id: album.id,
    name: album.name,
    release_year: new Date(album.release_date).getFullYear(),
    total_tracks: album.total_tracks,
    images: album.images.length > 0 ? album.images[0].url : "default_image_url",
    album_type: album.album_type,
  }));

  return loading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LoadingSpinner />
    </Box>
  ) : (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={totalRows}
      pagination
      paginationMode="server"
      pageSizeOptions={[15, 30, 50]}
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={(model) =>
        onPageChange(model.page, model.pageSize)
      }
      checkboxSelection
    />
  );
};

export default AlbumTable;
