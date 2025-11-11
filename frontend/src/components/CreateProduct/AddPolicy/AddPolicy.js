import React, { useState } from 'react';
import TextArea from '../../Forms/TextArea/TextArea';
import style from './AddPolicy.module.css';

const AddPolicy = ({ titlePolicy, getValuePolicy, name, initialValue = '' }) => {
  const [policy, setPolicy] = useState(initialValue);

  React.useEffect(() => {
    setPolicy(initialValue);
  }, [initialValue]);

  const handleChange = (value) => {
    setPolicy(value);
    getValuePolicy(value);
  };

  return (
    <div className={style.containerPolicy}>
      <h3>{titlePolicy}</h3>
      <TextArea
        state={{ value: policy }}
        label={'Descripción'}
        changeState={val => handleChange(val.value !== undefined ? val.value : val)}
        placeholder={'Escriba aquí'}
        name={name}
      />
    </div>
  );
};

export default AddPolicy;
