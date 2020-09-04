import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';



export default function Snippet({index,item}) {

  return (
    <div>
      <Paper className="snippetBox"
      style={index % 2 === 0 ? {float: 'left', backgroundColor: '#6accc3'}: {float : 'right'}}>
        <Typography component="p">
          {item}
        </Typography>
      </Paper>
    </div>
  );
}