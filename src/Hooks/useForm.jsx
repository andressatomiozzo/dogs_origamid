import React from "react";

const types = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Preencha um email válido",
  },
  passord: {
    regex: /(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_])^[\x21-\x7e]{8,255}$/,
    message: "A senha precisa ter 1 letra minúscula, 1 maiúscula, 1 número, 1 caractere especial. Com no mínimo 8 caracteres."
  }
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  const validate = (value) => {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null)
      return true
    }
  };

  const onChange = ({ target }) => {
    error && validate(target.value)
    setValue(target.value);
  };

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value)
  };
};

export default useForm;
