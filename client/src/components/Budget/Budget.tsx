import { useState, useContext, useEffect } from 'react';
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils"

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setBudget(newBudget);
    setIsEditing(false);
    updateBudget(newBudget);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>
        {isEditing ? (
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            className="form-control"
          />
        ) : (
          <>Budget: ${budget}</>
        )}
      </div>
      <div className="col-sm">
        {isEditing ? (
          <button type="button" className="btn btn-success mt-3" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button type="button" className="btn btn-primary mt-3" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};



export default Budget;