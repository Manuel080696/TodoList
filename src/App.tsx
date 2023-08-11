import { useState } from "react";
import { Todos } from "./components/Todos";
import {
  TodoTitle,
  type FilterValue,
  type TodoId,
  type Todo as TodoType,
} from "./types";
import { TODO_FILTERS } from "./const";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const mockTodos = [
  { id: "1", title: "Ver el Twitch de midu", completed: false },
  { id: "2", title: "Aprender React con TypeScript", completed: false },
  { id: "3", title: "Sacar ticket de la miduFest", completed: false },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );
  const handleRomeve = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id === id);
    setTodos(newTodos);
  };
  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed;
    }
    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed;
    }
    return todo;
  });

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };
  return (
    <section className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRomeve}
        onToggleCompleteTodo={handleCompleted}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </section>
  );
};

export default App;
