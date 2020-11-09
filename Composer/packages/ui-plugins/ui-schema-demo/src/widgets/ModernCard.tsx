// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/DeleteOutline';
import SkipNextIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      font: '15px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      font: '15px',
    },
    cover: {
      width: 100,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {},
  })
);

export function ModernCard({ header, body, id, onEvent }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="div" variant="subtitle1">
            {header}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {body}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={() => onEvent('event.data.delete', { id })}>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#eee',
          backgroundImage:
            'url("https://bot-framework.azureedge.net/static/180272-01e36566b1/intercom-webui/v1.6.2/assets/landing-page/images/Composer_Icon.png")',
          backgroundSize: 'contain',
        }}
      >
        <CardMedia
          className={classes.cover}
          image="https://bot-framework.azureedge.net/static/180272-01e36566b1/intercom-webui/v1.6.2/assets/landing-page/images/Composer_Icon.png"
          title="Live from space album cover"
        />
      </div>
    </Card>
  );
}
