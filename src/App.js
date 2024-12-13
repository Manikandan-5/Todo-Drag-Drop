import './App.css';
import ParticlesComponent from './StyleParticleComponent/particles';
import { TodoProvider } from "./Component/TodoContext";
import TodoHeader from './Component/TodoHeader';
function App() {
  return (
  <>
  <ParticlesComponent id='particles'/>
  <TodoProvider>
      <TodoHeader />
    </TodoProvider>
  </>

  );
}

export default App;
