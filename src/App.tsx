import "./App.css";
import Greeting from "./components/Greeting";
import TaskList from "./components/TaskList";
import UserCard from "./components/UserCard";

export default function App() {
  return (
    <div className="App">
      <h1>Моё React приложение</h1>
      <Greeting />
      <UserCard
        name="Иван Иванов"
        role="Администратор"
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?
q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
        isOnline={true}
      />
      <TaskList />
    </div>
  );
}
