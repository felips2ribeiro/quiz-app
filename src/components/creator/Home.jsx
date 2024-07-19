import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Field } from 'react-final-form';
import {Typography, Paper, Grid, FormControl, FormControlLabel, RadioGroup, TextField, Checkbox, FormLabel, Radio, FormGroup, Select, MenuItem, Button } from '@mui/material'


export default function home(props) {

    const onSubmit = () => {

    }
    const validate = () => {

    }


    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
            Admin Form
        </Typography>
        
        <Form
            onSubmit={onSubmit}
            initialValues={{ employed: true, stooge: 'larry' }}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={6}>
                    <Field
                        fullWidth
                        required
                        name="firstName"
                        component={TextField}
                        type="text"
                        label="First Name"
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Field
                        fullWidth
                        required
                        name="lastName"
                        component={TextField}
                        type="text"
                        label="Last Name"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Field
                        name="email"
                        fullWidth
                        required
                        component={TextField}
                        type="email"
                        label="Email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        label="Employed"
                        control={
                        <Field
                            name="employed"
                            component={Checkbox}
                            type="checkbox"
                        />
                        }
                    />
                    </Grid>
                    <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Best Stooge</FormLabel>
                        <RadioGroup row>
                        <FormControlLabel
                            label="Larry"
                            control={
                            <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="larry"
                            />
                            }
                        />
                        <FormControlLabel
                            label="Moe"
                            control={
                            <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="moe"
                            />
                            }
                        />
                        <FormControlLabel
                            label="Curly"
                            control={
                            <Field
                                name="stooge"
                                component={Radio}
                                type="radio"
                                value="curly"
                            />
                            }
                        />
                        </RadioGroup>
                    </FormControl>
                    </Grid>
                    <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sauces</FormLabel>
                        <FormGroup row>
                        <FormControlLabel
                            label="Ketchup"
                            control={
                            <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="ketchup"
                            />
                            }
                        />
                        <FormControlLabel
                            label="Mustard"
                            control={
                            <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="mustard"
                            />
                            }
                        />
                        <FormControlLabel
                            label="Salsa"
                            control={
                            <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="salsa"
                            />
                            }
                        />
                        <FormControlLabel
                            label="Guacamole 🥑"
                            control={
                            <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="guacamole"
                            />
                            }
                        />
                        </FormGroup>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="notes"
                        component={TextField}
                        multiline
                        label="Notes"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Field
                        fullWidth
                        name="city"
                        component={Select}
                        label="Select a City"
                        formControlProps={{ fullWidth: true }}
                    >
                        <MenuItem value="London">London</MenuItem>
                        <MenuItem value="Paris">Paris</MenuItem>
                        <MenuItem value="Budapest">
                        A city with a very long Name
                        </MenuItem>
                    </Field>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={reset}
                        disabled={submitting || pristine}
                    >
                        Reset
                    </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Submit
                    </Button>
                    </Grid>
                </Grid>
                </Paper>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
            )}
        />
        </div>
    );
    }