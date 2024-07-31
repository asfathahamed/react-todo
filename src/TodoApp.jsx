import React, { useEffect, useReducer, useState } from "react";

const tableStyle = {
  width: "500px",
};

export default function TodoApp() {
  const todoListReducer = (state, { type, data }) => {
    switch (type) {
      case "add": {
        return [...state, data];
      }
      case "remove": {
        return state.splice(data, 1);
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
      <div>TodoApp</div>
      {/* Form */}
      <form action="" onSubmit={createTodoItem}>
        <div>
          <label>Description</label>
          <input type="text" name="description" required />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" name="due" required min={todayDate} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      {/* Table */}
      <table style={tableStyle}>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, ind) => {
            return (
              <tr key={`todo-list-item-${ind}`}>
                <td>{todo.description}</td>
                <td>{todo.due}</td>
                <td>
                  <button
                    onClick={() =>
                      dispatchTodoList({ type: "remove", data: ind })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
