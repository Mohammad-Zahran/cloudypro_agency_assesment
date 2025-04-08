import { useEffect, useState } from "react";
import axios from "axios";
import { Album } from "../types/types";
import { Avatar, Box } from "@mui/material";
import YearFilter from "../components/Table_Components/YearFilter";
import AlbumTable from "../components/Table_Components/AlbumTable";
import AlertSnackbar from "../components/AlertSnackbar";
import { Link } from "react-router-dom";
import { getValidSpotifyToken } from "../utils/TokenManager";

const HomePage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", type: "success" });

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await getValidSpotifyToken();

        const url = `https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m/albums?offset=${
          page * pageSize
        }&limit=${pageSize}&locale=en-US,en;q%3D0.9,ar;q%3D0.8&include_groups=album,single,compilation,appears_on`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAlbums(response.data.items);
        setTotalRows(response.data.total);
        setAlert({
          open: true,
          message: "Albums loaded successfully!",
          type: "success",
        });
      } catch (err) {
        setError("Failed to fetch albums. Please try again.");
        setAlert({
          open: true,
          message: "Error fetching albums.",
          type: "error",
        });
        console.error("Error fetching albums:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [page, pageSize]);

  const uniqueYears = Array.from(
    new Set(
      albums
        .filter((album) =>
          ["year", "month", "day"].includes(album.release_date_precision)
        )
        .map((album) => new Date(album.release_date).getFullYear())
    )
  ).sort((a, b) => b - a);

  const filteredAlbums = selectedYear
    ? albums.filter((album) => {
        if (!album.release_date || !album.release_date_precision) return false;

        if (["year", "month", "day"].includes(album.release_date_precision)) {
          const albumYear = new Date(album.release_date)
            .getFullYear()
            .toString();
          return albumYear === selectedYear;
        }

        return false;
      })
    : albums;

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "images",
      headerName: "Cover",
      width: 120,
      renderCell: (params: any) => (
        <Avatar
          src={params.value}
          alt="Album Cover"
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          component={Link}
          to={`/albums/${params.id}`}
        />
      ),
    },
    {
      field: "name",
      headerName: "Album Name",
      flex: 1,
      renderCell: (params: any) => (
        <Link
          to={`/albums/${params.id}`}
          style={{ textDecoration: "none", color: "green", fontWeight: "bold" }}
        >
          {params.value}
        </Link>
      ),
    },

    { field: "release_year", headerName: "Release Year", flex: 1 },
    { field: "total_tracks", headerName: "Tracks", flex: 1 },
    { field: "album_type", headerName: "Album Type", flex: 1 },
  ];

  return (
    <Box sx={{ padding: 2, marginLemaft: "200px" }}>
      <Box display="flex" justifyContent="start">
        <YearFilter
          selectedYear={selectedYear}
          uniqueYears={uniqueYears}
          onYearChange={setSelectedYear}
        />
      </Box>
      <AlbumTable
        albums={filteredAlbums}
        columns={columns}
        totalRows={totalRows}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        loading={loading}
      />
      <AlertSnackbar
        alert={alert}
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
};

export default HomePage;
