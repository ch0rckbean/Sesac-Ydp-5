import { useDispatch, useSelector } from 'react-redux';
import { Box1, Box2, Box3, Box4 } from '../App4';
import { plus, minus } from '../store/counterReducer';

export const Box1Container = () => {
  return <Box1 />;
};
export const Box2Container = () => {
  return <Box2 />;
};
export const Box3Container = () => {
  return <Box3 />;
};
export const Box4Container = () => {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.counter.number);

  return (
    <Box4
      number={number}
      onPlus={() => dispatch(plus())}
      onMinus={() => dispatch(minus())}
    />
  );
};
