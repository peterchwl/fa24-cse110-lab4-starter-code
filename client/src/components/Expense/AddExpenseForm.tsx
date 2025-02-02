import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense, deleteExpense, fetchExpenses} from "../../utils/expense-utils"

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let nId;
    if(expenses.length == 0){
      nId = 0;
    }
    else{
      nId = expenses[expenses.length-1].id
    }
    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
      id: String(Number(nId) + 1),
      description: description,
      cost: Number(cost)
    };
    createExpense(newExpense);
    setExpenses([...expenses, newExpense]);

    setDescription("");
    setCost("");
  };
  

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
