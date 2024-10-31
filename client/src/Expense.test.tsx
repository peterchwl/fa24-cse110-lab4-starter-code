import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe("Create Expense", () => {
  test("renders create expense form and adds a new expense", () => {
    render(<App />);

    const initialRemaining = screen.getByText("Remaining: $1000");
    const initialSpent = screen.getByText("Spent so far: $0");
    
    expect(initialRemaining).toBeInTheDocument();
    expect(initialSpent).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "My new expense" } });
    fireEvent.change(costInput, { target: { value: "10" } });

    fireEvent.click(saveButton);

    const newExpense = screen.getByText("My new expense");
    expect(newExpense).toBeInTheDocument();

    const updatedRemaining = screen.getByText("Remaining: $990");
    const updatedSpent = screen.getByText("Spent so far: $10");
    
    expect(updatedRemaining).toBeInTheDocument();
    expect(updatedSpent).toBeInTheDocument();
  });
});

describe("Delete Expense", () => {
    test("create expense form and delete it", () => { // ensure that total spent and remaining update
        render(<App />);

        const nameInput = screen.getByLabelText("Name");
        const costInput = screen.getByLabelText("Cost");
        const saveButton = screen.getByText("Save");
        const initialRemaining = screen.getByText("Remaining: $1000");
        const initialTotalSpent = screen.getByText("Spent so far: $0");
            
        fireEvent.change(nameInput, { target: { value: "Deletable Expense" } });
        fireEvent.change(costInput, { target: { value: "6" } });

        fireEvent.click(saveButton);

        const newExpense = screen.getByText("Deletable Expense");
        expect(newExpense).toBeInTheDocument();

        const deleteButton = screen.getAllByText("x")[0];
        fireEvent.click(deleteButton);

        expect(screen.queryByText("Deletable Expense")).not.toBeInTheDocument();
        expect(initialTotalSpent).toBeInTheDocument();
        expect(initialRemaining).toBeInTheDocument();
  });
});



describe("Budget balance verification", () => {
    test("create new expenses then verify budget, then delete then verify again", () => {
      render(<App />);
  
      // create and constantly check the remaining and spent values to match the budget manually
      const initialRemaining = screen.getByText("Remaining: $1000");
      const initialSpent = screen.getByText("Spent so far: $0");
      const budget = screen.getByText("Budget: $1000");
      
      expect(initialRemaining).toBeInTheDocument();
      expect(initialSpent).toBeInTheDocument();
  
      const nameInput = screen.getByLabelText("Name");
      const costInput = screen.getByLabelText("Cost");
      const saveButton = screen.getByText("Save");
  
      fireEvent.change(nameInput, { target: { value: "My new expense" } });
      fireEvent.change(costInput, { target: { value: "10" } });
  
      fireEvent.click(saveButton);
  
      const newExpense = screen.getByText("My new expense");
      expect(newExpense).toBeInTheDocument();
  
      let updatedRemaining = screen.getByText("Remaining: $990");
      let updatedSpent = screen.getByText("Spent so far: $10");
      
      expect(updatedRemaining).toBeInTheDocument();
      expect(updatedSpent).toBeInTheDocument();
      expect(budget).toBeInTheDocument();

      fireEvent.change(nameInput, { target: { value: "My second expense" } });
      fireEvent.change(costInput, { target: { value: "20" } });
    
      fireEvent.click(saveButton);
  
      const secondExpense = screen.getByText("My second expense");
      expect(secondExpense).toBeInTheDocument();
  
      updatedRemaining = screen.getByText("Remaining: $970");
      updatedSpent = screen.getByText("Spent so far: $30");
      
      expect(updatedRemaining).toBeInTheDocument();
      expect(updatedSpent).toBeInTheDocument();
      expect(budget).toBeInTheDocument();

      // delete and consistently check if remaining and spent adds up to budget
      let deleteButton = screen.getAllByText("x")[1];
      fireEvent.click(deleteButton);

      updatedRemaining = screen.getByText("Remaining: $990");
      updatedSpent = screen.getByText("Spent so far: $10");
      
      expect(updatedRemaining).toBeInTheDocument();
      expect(updatedSpent).toBeInTheDocument();
      expect(budget).toBeInTheDocument();

      deleteButton = screen.getAllByText("x")[0];
      fireEvent.click(deleteButton);

      updatedRemaining = screen.getByText("Remaining: $1000");
      updatedSpent = screen.getByText("Spent so far: $0");
      
      expect(updatedRemaining).toBeInTheDocument();
      expect(updatedSpent).toBeInTheDocument();
      expect(budget).toBeInTheDocument();
    });
  });