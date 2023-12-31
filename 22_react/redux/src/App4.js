import {
  Box1Container,
  Box2Container,
  Box3Container,
  Box4Container,
} from './container/BoxesContainer';
import { minus, plus } from './store/counterReducer';
import './styles/Box.css';
// redux
import { useSelector, useDispatch } from 'react-redux';

function App4() {
  const number = useSelector((state) => state.counter.number);

  return (
    <div className="App">
      <h1>Redux</h1>
      <h2>number: {number}</h2>
      <Box1Container />
    </div>
  );
}

export const Box1 = () => {
  return (
    <div className="Box">
      <h2>Box1 </h2>
      <Box2Container />
    </div>
  );
};
export const Box2 = () => {
  return (
    <div className="Box">
      <h2>Box2</h2>
      <Box3Container />
    </div>
  );
};
export const Box3 = () => {
  return (
    <div className="Box">
      <h2>Box3</h2>
      <Box4Container />
    </div>
  );
};
export const Box4 = ({ number, onPlus, onMinus }) => {
  return (
    <div className="Box">
      <h2>Box4: {number}</h2>
      <button onClick={onPlus}>PLUS</button>
      <button onClick={onMinus}>MINUS</button>
    </div>
  );
};

export default App4;
