import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if (props.valid && props.validation && props.touched) {
        inputClasses.push(classes.inValid);
    }
    let ErrorMsg = null;
    if (props.valid && props.touched) {
        ErrorMsg = <p>Please Enter Valid {props.elementType}</p>
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {
                    props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))
                }
            </select>
            break;
        default:
            inputElement = <input {...props.elementConfig}
                className={classes.InputElement}
                value={props.value} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.Label}</label>
            {inputElement}
            {ErrorMsg}
        </div>
    )
}
export default Input;