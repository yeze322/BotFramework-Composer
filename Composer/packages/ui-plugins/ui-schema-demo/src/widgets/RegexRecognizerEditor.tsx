// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { FieldProps } from '@bfc/extension-client';
import cloneDeep from 'lodash/cloneDeep';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

export const RegexRecognizerEditor: React.FC<FieldProps> = (props) => {
  const { value, onChange } = props;
  const intents = value.intents;

  if (!Array.isArray(intents)) return null;

  const updatePattern = (intentIndex, newRegex) => {
    const newData = cloneDeep(value);
    newData.intents[intentIndex].pattern = newRegex;
    onChange(newData);
  };

  return (
    <div>
      <h5>My custom recognizer editor (regex)</h5>
      <DenseTable rows={intents} onUpdateRow={updatePattern} />
    </div>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export function DenseTable({ rows, onUpdateRow }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="a dense table" className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Intent</TableCell>
            <TableCell>Pattern</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.intent}
              </TableCell>
              <TableCell>
                <TextField value={row.pattern} onChange={(e) => onUpdateRow(index, e.target.value)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
