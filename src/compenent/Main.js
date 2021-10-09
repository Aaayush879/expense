import React,{useContext} from 'react';
import {Card , CardHeader, CardContent, Typography , Divider , Grid} from '@material-ui/core';
import Form from './Form';
import List from './List';
import useStyles from './mainStyle';
import { mergeClasses } from '@material-ui/styles';
import { ExpenseTrackerContext } from './Context';

const Main = () => {

    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root} style={{opacity:'0.9'}}>
            <CardHeader title='Expence tracker' subheader='powered by speechly'/>

            <CardContent>
                <Typography varient='h4' align='center'>Rs:{balance}</Typography>
                <Typography varient='subtitle1' style={{marginTop:'20px' , lineHeight:'1.5em'}}>
                    Try saying: Add income of Rs10  in savings category for Monday ...
                </Typography>
                <Divider/>
                <Form/>

            </CardContent>
            <hr/>
            <CardContent className={classes.cartContent}>
                <Grid container spacing={2} >
                    <Grid items xs={12} >
                        <List/>
                    </Grid>

                </Grid>
            </CardContent>
            
        </Card>
    )
}

export default Main;
