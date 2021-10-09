import React, { useEffect, useRef } from 'react';    
import { Grid } from '@material-ui/core';

import { SpeechState, useSpeechContext  } from "@speechly/react-client";
import { PushToTalkButton, PushToTalkButtonContainer , ErrorPanel} from '@speechly/react-ui';
import Details from './compenent/Details';
import Main from './compenent/Main';
import useStyles from './Style';

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh'}}>
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid  item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
          <ErrorPanel/>
        </PushToTalkButtonContainer>
      </Grid>
    </div>
  );
};

export default App;