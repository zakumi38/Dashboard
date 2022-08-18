import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Stack, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import styled from "@emotion/styled"
import postsStyle from "./blog-list.module.sass"
import axios from "axios"
import { Link } from "react-router-dom"

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
)

const UsersTable = ({ posts, loadPosts }) => {
    const Delete = (id) => {
        axios.delete(`http://localhost:3500/blogs/${id}`).then(() => {
            loadPosts()
        })
    }
    return (
        <TableContainer component="main" sx={{ margin: "20px 0" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>ID</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>Image</Typography>{" "}
                        </TableCell>
                        <TableCell>
                            <Typography>Title</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>Description</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>Create Date</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>
                                <Typography>{index + 1}</Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <img
                                    className={postsStyle.image}
                                    src={post.img}
                                    alt=""
                                />
                            </TableCell>
                            <TableCell>
                                <Typography> {post.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={postsStyle.paragraphResponsive}
                                >
                                    {post.description}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{post.date}</Typography>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={2}>
                                    <Link to={`/blog/edit/${post.id}`}>
                                        <ActionIcon
                                            color="#2e7d32"
                                            icon={faPenToSquare}
                                        />
                                    </Link>
                                    <div onClick={() => Delete(post.id)}>
                                        <ActionIcon
                                            color="#d32f2f"
                                            icon={faTrash}
                                        />
                                    </div>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable
