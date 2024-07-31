import {
  TextField,
  Box,
  Grid,
  Button,
  Container,
  CssBaseline,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";

export default function TodoApp() {
  const todoListReducer = (state, { type, data }) => {
    switch (type) {
      case "add": {
        return [...state, data];
      }
      case "remove": {
        state.splice(data, 1);
        return [...state];
      }
      default:
        return state;
    }
  };
  const [todoList, dispatchTodoList] = useReducer(todoListReducer, [
    { description: "Sample", due: "2025-07-31" },
  ]);
  const [todayDate, setTodayDate] = useState("");

  const checkZeroInDate = (unformattedValue) =>
    unformattedValue < 10 ? `0${unformattedValue}` : unformattedValue;

  useEffect(() => {
    const newDate = new Date();
    setTodayDate(
      `${newDate.getFullYear()}-${checkZeroInDate(
        newDate.getMonth() + 1
      )}-${checkZeroInDate(newDate.getDate())}`
    );
  }, []);

  const createTodoItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newItem = {};
    for (const pair of formData.entries()) {
      newItem[pair[0]] = pair[1];
    }
    dispatchTodoList({ type: "add", data: newItem });
    form.reset();
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div>TodoApp</div>
        {/* Form */}
        <Box
          component="form"
          noValidate
          onSubmit={createTodoItem}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                id="todo-description"
                label="Description"
                variant="standard"
                name="description"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                id="todo-due"
                label="Due Date"
                variant="standard"
                name="due"
                required
                min={todayDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" size="small" type="submit" fullWidth>
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.map((todo, ind) => (
                <TableRow key={`todo-list-item-${ind}`}>
                  <TableCell scope="row">{todo.description}</TableCell>
                  <TableCell>{todo.due}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      type="submit"
                      fullWidth
                      color="error"
                      onClick={() =>
                        dispatchTodoList({ type: "remove", data: ind })
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
