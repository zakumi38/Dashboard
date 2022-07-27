import React, {useState} from "react"
import {
    Breadcrumbs, Button,
    Container, FormControl, Grid, IconButton, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Pagination,
    TextField
} from "@mui/material";
import teamStyle from "./team.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faTrashCan,
    faPencil,
    faPlus,
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import {Link, useNavigate} from "react-router-dom"
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import api from "../../../mockdatabase/database";

const columns = [
    {
        id: 'id',
        label: "Id",
        minWidth: "50px"
    },
    {
        id: 'name',
        label: "Name",
        minWidth: '130px'
    },
    {
        id: 'email',
        label: "Email",
        minWidth: "210px"
    },
    {
        id: 'occupation',
        label: "Occupation",
        minWidth: "150px"
    },
    {
        id: "phone",
        label: "Phone",
        minWidth: "120px"
    },
    {
        id: "Info",
        label: "Info",
        minWidth: "50px"
    },
    {
        id: "actions",
        label: "Actions",
        minWidth: "120px"
    }
]
const TableHeader = ({all = false}) => columns.map(column => (
    <TableCell component="th" scope="row" key={column.id}
               sx={{
                   fontWeight: "bold",
                   fontSize: "1rem",
                   minWidth: column.minWidth,
               }}>{column.label === 'Phone' && all ? 'Team':column.label}</TableCell>
))
function CustomTable({items, all = false, teams,deleteItem }){
    const navigate = useNavigate()
    return(
        <>
            <Table className={teamStyle.teamTable}>
                <TableHead>
                    <TableRow>
                        {all? <TableHeader all={true}/>:<TableHeader/> }
                    </TableRow>
                </TableHead>
                <TableBody className={teamStyle.tableBody}>
                    {items.map(row => (
                        <TableRow sx={{maxHeight:'100px'}} key={row.id}>
                            <TableCell scope="row">{row.id}</TableCell>
                            <TableCell scope="row">{row.name}</TableCell>
                            <TableCell scope="row">{row.email}</TableCell>
                            <TableCell scope="row">{row.occupation}</TableCell>
                            <TableCell scope="row">{all ?row.team.charAt(0).toUpperCase() + row.team.slice(1) :row.phone}</TableCell>
                            <TableCell scope="row" className={teamStyle.view}>
                                <a onClick={_ => navigate(`/team/${row.team}/${row.id}/view`, {state:{row}})}>View</a>
                            </TableCell>
                            <TableCell scope="row" className={teamStyle.actions}>
                                <IconButton onClick={_ => navigate(`/team/${row.team}/${row.id}/edit`, {state:{row,teams}})} aria-label="delete">
                                    <FontAwesomeIcon icon={faPencil} className={teamStyle.edit}/>
                                </IconButton>
                                <IconButton onClick={_ => deleteItem(row.id)}>
                                    <FontAwesomeIcon icon={faTrash} className={teamStyle.delete}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
// Table Header
const breadcrumbs = [
    <Link to="/" key="1" className={teamStyle.breadcrumbLink}>
        Home
    </Link>,
    <Typography key="2" className={`${teamStyle.breadcrumbLink} ${teamStyle.inActive}`}>
        Teams
    </Typography>,
]
export default function Teams() {
    const [curPage, setCurPage] = useState(1)
    const [team, selectTeam] = useState('')
    const [teams, setTeams] = useState([])
    const [rows, setRows] = useState([])
    const [displayItems, setDisplayItems] = useState([])
    const [displayTeam, setDisplayTeam] = useState([])
    const [actionTeamName, setActionTeamName] = useState('')
    const [addingTeam, setAddingTeam] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const navigate = useNavigate()
    function deleteItem(id){
        // api.delete(`/developer-team-members/${id}`)
        if(team === 'All'){
            if(curPage !== 1 && displayItems.length === 1){
                const filterItems = rows.filter(item => item.id !== id)
                const currentPage = curPage - 1
                setCurPage(currentPage)
                setRows(filterItems)
                setTotalPage(totalPage - 1)
                setDisplayItems(filterItems.slice(currentPage * 5 - 5,currentPage * 5)) 
            }
            else{
                totalPage !== 1 && rows.length % 5 === 1 && setTotalPage(totalPage - 1)
                const filterItems = rows.filter(item => item.id !== id)
                setRows(filterItems)
                setDisplayItems(filterItems.slice(curPage * 5 - 5,curPage * 5)) 
            }
        }
        else{
            if(curPage !== 1 && displayItems.length === 1){
                const filterItems = displayTeam.filter(item => item.id !== id)
                const currentPage = curPage - 1
                setTotalPage(totalPage - 1)
                setCurPage(currentPage)
                setDisplayTeam(filterItems)
                setRows(rows.filter(item => item.id !== id))
                setDisplayItems(filterItems.slice(currentPage * 5 - 5,currentPage * 5)) 
            }
            else{
                totalPage !== 1 && displayTeam.length % 5 === 1 && setTotalPage(totalPage - 1)
                const filterItems = displayTeam.filter(item => item.id !== id)
                setDisplayTeam(filterItems)
                setRows(rows.filter(item => item.id !== id))
                setDisplayItems(filterItems.slice(curPage * 5 - 5,curPage * 5)) 
            }
        }
    }
    function handleTeamChange(e) {
        const selectedTeam = e.target.value
        const filter = selectedTeam !== 'All' && rows.filter(person => person.team === selectedTeam.toLowerCase())
        filter && setDisplayTeam(filter)
        filter && setDisplayItems(filter.slice(0,5))
        selectTeam(selectedTeam)
        selectedTeam === 'All'?navigate('/team', {replace:true}):navigate(`/team/${selectedTeam.toLowerCase()}`,{replace:true})
    }
    useEffect(_ => {
        api.get("/developer-team-members").then(res => {
            setDisplayItems(res.data.slice(0,5));
            setRows(res.data);
            })
        api.get("/developer-team-members?_page=2&_limit=5").then(res => console.log(res.data))
        api.get("/developer-teams").then(res => {setTeams(res.data);selectTeam(res.data[0].teamname)})
    },[])
    useEffect(_ => {
        team === 'All' && setDisplayItems(rows.slice(0,5))
        setCurPage(1);
        const totalPgs = team === 'All'?Math.ceil(rows.length/5):Math.ceil(displayTeam.length/5)
        setTotalPage(totalPgs)
    }, [team])
    function AddTeam(post = false,deleteTeam = false){
        setAddingTeam(true)
        if(post){
            setTeams(prevval => [...prevval,{"id":teams.length,"teamname":actionTeamName}])
            setAddingTeam(false)
            api.post("/developer-teams",{"id":teams.length,"teamname":actionTeamName})
        }
        if(deleteTeam){
            const deletedTeam = teams.find(team => team.teamname === actionTeamName)
            setTeams(teams.filter(team => team.teamname !== actionTeamName))
            deletedTeam && api.delete(`/developer-teams/${deletedTeam.id}`)
        }
        setActionTeamName('')
    }
    return (
        <Container maxWidth={false} className={teamStyle.teamContainer}>
            <Grid container justifyContent="space-between">
                <Grid item sm={4}>
                    <Breadcrumbs
                        separator={<FontAwesomeIcon icon={faAngleRight}/>}
                        aria-label="breadcrumb" className={teamStyle.breadcrumb}>
                        {breadcrumbs}
                    </Breadcrumbs>
                </Grid>
                <Grid item container md={5} justifyContent="space-between">
                    <Grid item xs={8} container>
                        {addingTeam ?
                        <>
                        <Grid item xs ={10}>
                            <TextField fullWidth value={actionTeamName} onChange={e => setActionTeamName(e.target.value)}></TextField> 
                        </Grid>
                        <Grid item xs ={5}>
                            <Button color='error' onClick={_ => setAddingTeam(false)} variant='contained'>Cancel</Button>
                        </Grid>
                        <Grid item xs ={5} align='right'>
                            <Button onClick={_ => AddTeam(true)} variant='contained'>Add</Button>
                        </Grid>
                            
                        </>
                        :
                            <FormControl fullWidth>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={team}
                                onChange={handleTeamChange}
                                MenuProps={{ classes: { paper: teamStyle.teamSelect } }}
                            >
                                {teams.map(team => <MenuItem value={team.teamname} key={team.id} className={teamStyle.teamSelectItem}>{team.teamname}</MenuItem>)}
                            <Button onClick={_ => AddTeam(false)} fullWidth color='primary'
                                        className={teamStyle.teamSelectItem}>Add Team&nbsp;<FontAwesomeIcon size="sm" icon={faPlus}/></Button>
                            <Button onClick={_ => AddTeam(false, true)} fullWidth color='primary'
                                        className={teamStyle.deleteTeam}>Delete Team&nbsp;<FontAwesomeIcon size="sm" color="red" icon={faTrashCan}/></Button>
                            </Select>
                        </FormControl>
                    }
                    </Grid>
                    <Grid item sm={3} align='right'>
                        <Button onClick={_ => navigate(`/team/${team.toLowerCase()}/addMember`, {state:{teams:teams.slice(1)}})} variant="contained" className={teamStyle.addTeamIcon}><FontAwesomeIcon
                            size='xs' icon={faPlus}/>
                            
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer className={teamStyle.tableContainer}>
                {
                team === 'All'?
                <>
                        <CustomTable items={displayItems} all={true} teams={teams} deleteItem={deleteItem}/>
                        <Pagination className={teamStyle.pagination} count={totalPage} 
                                page={curPage} siblingCount={1} boundaryCount={1} 
                                onChange={(e, pageNumber) => {
                                setCurPage(pageNumber)
                                const startindex = pageNumber * 5 -5
                                const endIndex = pageNumber * 5
                                setDisplayItems(rows.slice(startindex,endIndex))
                        }}/>
                        </>
                :
                    <>
                        <CustomTable items={displayItems} teams={teams} deleteItem={deleteItem}/>
                            <Pagination className={teamStyle.pagination} count={totalPage} 
                                    page={curPage}
                                    siblingCount={1} boundaryCount={1} 
                                    onChange={(e,pageNumber) => {
                                        setCurPage(pageNumber)
                                        const startindex = pageNumber * 5 -5
                                        const endIndex = pageNumber * 5
                                        setDisplayItems(displayTeam.slice(startindex,endIndex))
                            }}/>
                    </>
                }
            </TableContainer>
        </Container>
    );
}