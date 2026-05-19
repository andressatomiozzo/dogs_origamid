import React from 'react'
import styles from "./Input.module.css"

const Input = ({ id, label, type, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} className={styles.input}/>
      <p className={styles.error}>Erro</p>
    </div>
  );
};

export default Input;
