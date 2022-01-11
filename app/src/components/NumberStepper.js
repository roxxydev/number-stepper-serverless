import { useState, useEffect } from 'react';
import { fetchCurrentNumberValue, stepNumberValue } from '../store/number';

function NumberStepper() {

  const [number, setNumber] = useState();

  useEffect(() => {
    callApiFetchNumber()
  });

  const callApiFetchNumber = async ()=> {
    setNumber(await fetchCurrentNumberValue());
  };

  const onStepperPress = async (action) => {
    setNumber(await stepNumberValue(action));
  };

  return (
    <div className="number-stepper">
      <div>
        <button
            className="button-stepper"
            onClick={() => { onStepperPress('increment') }}>+</button>
        {number}
        <button
            className="button-stepper"
            onClick={() => { onStepperPress('decrement') }}>-</button>
      </div>
      <div>
        <button
          className="button-reset"
          onClick={() => { onStepperPress('reset') }}>RESET</button>
      </div>
    </div>
  );
};

export default NumberStepper;
