import React, { useState, useEffect } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Grid,
  Pagination,
  PaginationItem,
  Chip,
  Stack,
  TableBody,
  TableCell,
  Table,
  Typography,
  TableContainer,
  CircularProgress,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import api from "../../../../mockdatabase/database";
import useAxiosFetch from "./useAxiosFetch";
import { Link } from "react-router-dom";

const TableCells = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid #2d2d2d24",

  "& .MuiTypography-root": {
    overflowX: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100px",
    },
  },
}));

const ActionIcon = styled(FontAwesomeIcon)(
  {
    color: "#000",
    cursor: "pointer",
    fontSize: "25px",
    margin: "0 10px",
    "&:hover": {
      color: "#1976d2",
    },
  },
  (props) => ({
    color: props.color,
  })
);
const rightArrow = () => {
  return <FontAwesomeIcon icon={faArrowRight} />;
};
const leftArrow = () => {
  return <FontAwesomeIcon icon={faArrowLeft} />;
};
const tabelCell = ["ID", "User Name", "Email", "Roles", "Status", "Actions"];
const UsersTable = () => {
  const [data, setData] = useState([]);
  const [users, loading, error] = useAxiosFetch({
    axiosInstance: api,
    method: "get",
    url: "/users",
  });

  useEffect(() => {
    setData(users);
  }, [users]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastPage = currentPage * usersPerPage;
  const indexOfFirstPage = indexOfLastPage - usersPerPage;
  const currentPost = data?.slice(indexOfFirstPage, indexOfLastPage);

  const pageCount = Math.ceil(data?.length / usersPerPage);

  const handleClick = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    const items = data.filter((user) => user.id !== id);
    setData(items);
  };

  console.log(users);
  return (
    <>
      <TableContainer
        component="main"
        sx={{ margin: "20px 0", minHeight: "400px" }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!loading && data && (
          <>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tabelCell.map((cell, index) => (
                    <TableCells key={index}>
                      <Typography>{cell}</Typography>
                    </TableCells>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPost?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCells>
                      <Typography>{row.id}</Typography>
                    </TableCells>
                    <TableCells component="th" scope="row">
                      <Typography> {row.userName}</Typography>
                    </TableCells>
                    <TableCells>
                      <Typography> {row.emailAddress}</Typography>
                    </TableCells>
                    <TableCells>
                      <Typography>{row.roles}</Typography>
                    </TableCells>
                    <TableCells>
                      <Chip
                        sx={{ borderRadius: "5px" }}
                        label={row.status}
                        color={row.status === "Active" ? "success" : "error"}
                      />
                    </TableCells>
                    <TableCells>
                      <Stack direction="row" spacing={2}>
                        <Link to={`/edit-user/${row.id}`}>
                          <ActionIcon color="#2e7d32" icon={faPenToSquare} />
                        </Link>

                        <Link to="/" onClick={() => handleDelete(row.id)}>
                          <ActionIcon color="#d32f2f" icon={faTrash} />
                        </Link>
                      </Stack>
                    </TableCells>
                  </TableRow>
                ))}
              </TableBody>
            </Table>{" "}
          </>
        )}
      </TableContainer>

      {!loading && (
        <Grid container sx={{ gap: { xs: "1rem", sm: "0" } }}>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography>
                Showing {indexOfFirstPage + 1} to{" "}
                {currentPost.length % usersPerPage === 0
                  ? indexOfLastPage
                  : users.length}{" "}
                {""}
                of {""}
                {users?.length} entries
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} sx={{ alignItems: "end" }}>
              <Pagination
                shape="rounded"
                count={pageCount}
                color="primary"
                page={currentPage}
                onChange={handleClick}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: leftArrow,
                      next: rightArrow,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UsersTable;
