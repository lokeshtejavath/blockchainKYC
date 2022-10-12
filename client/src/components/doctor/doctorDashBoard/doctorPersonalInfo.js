import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from '../../genericFiles/Title';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import {ADDRESS} from "../../genericFiles/constants";
import SpinnerDialog from "../../genericFiles/SpinnerDialog";


const theme = createMuiTheme();
const avatar = {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
};
const paper = {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
const form = {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
};
const submit = {
    margin: theme.spacing(3, 0, 2),
};

export default function DoctorPersonalInfo(props) {
    const [updatedData, setUpdatedData] = React.useState(JSON.parse(props.data));
    const [loaded, setLoaded] = React.useState(false);
    var doctor = updatedData;
    doctor.password = '';
    doctor.id = doctor.medicalRegistrationNo;
    console.log(updatedData);
    const manageUpdateForm = () => {
        var x = document.getElementById("form");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    };
    const handleChange = (event) => {
        doctor[event.target.name] = event.target.value;
        console.log(doctor[event.target.name]);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setLoaded(true);
        let response = "";
        try {
            console.log(doctor);
            response = await axios.post(ADDRESS + `updateAsset`, doctor);
            response = response.data;
            console.log(response);
            if (response === "Correct") {
                console.log(response);
                manageUpdateForm();
                delete doctor.password;
                setUpdatedData(doctor);
            } else {
                //show error message
                console.log(response);
            }
        } catch (e) {
            console.log("failed to connect to the server");
        }
        setLoaded(false);
    };

    return (
        <React.Fragment>
            <Title>{updatedData.firstName} {updatedData.lastName}</Title>
            <Typography component="p" variant="h6" align='center'>
                UserName : {updatedData.userName}
                <br/>
                Date of Birth : {updatedData.DOB}
                <br/>
                Gender : {updatedData.gender}
                <br/>
                Medical Registration No : {updatedData.medicalRegistrationNo}
                <br/>
                Specialisation : {updatedData.specialisation}
                <br/>
                Phone : {updatedData.phone}
                <br/>
                Aadhaar : {updatedData.aadhaar}
                <br/>
                Address : {updatedData.address}
            </Typography>
            <div align='center'>
                <Link color="primary" onClick={manageUpdateForm}>
                    Update Doctor Info
                </Link>
            </div>
            <div id="form" style={{display: 'none'}}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div style={paper}>
                        <Avatar style={avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update Info
                        </Typography>
                        <form style={form} onSubmit={submitForm}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        defaultValue={doctor.firstName}
                                        autoFocus={true}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        defaultValue={doctor.lastName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="date"
                                        label="Date of Birth"
                                        type="date"
                                        name="DOB"
                                        defaultValue={doctor.DOB}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="specialisation"
                                        name="specialisation"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="specialisation"
                                        label="Specialisation"
                                        defaultValue={doctor.specialisation}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone No."
                                        name="phone"
                                        autoComplete="phone"
                                        defaultValue={doctor.phone}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="aadhaar"
                                        label="Aadhaar"
                                        name="aadhaar"
                                        autoComplete="45454545455"
                                        defaultValue={doctor.aadhaar}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="India"
                                        defaultValue={doctor.address}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={submit}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
            <SpinnerDialog open={loaded}/>
        </React.Fragment>
    );
}
