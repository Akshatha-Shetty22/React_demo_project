//htmlFor tells us which label is coonect to which input,connect them using Id
import Card from "../UI/Card";
import styles from './AddUser.module.css';
import Button from "../UI/Button";
import React,{useState,useRef} from 'react';
import ErrorModal from "../UI/ErrorModal";
function AddUser(props)
{
    const nameInputRef=useRef();
    const ageInputRef=useRef();
    // const [enteredUsername,setEnteredUsername]=useState('');
    // function usernameChangeHandler(event)
    // {
    //     setEnteredUsername(event.target.value);
    // }
    // const [enteredAge,setEnteredAge]=useState('');
    // function ageChangeHandler(event)
    // {
    //     setEnteredAge(event.target.value);
    // }
    const [error,setError]=useState();
    function errorHandler()
    {
        setError(null);
    }
    function addUserHandler(event)
    {
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredUserAge=ageInputRef.current.value;
        if(enteredName.trim().length===0 || enteredUserAge.trim().length===0)
        {
            setError({
                title:'Invalid Input',
                message:'Please enter valid name and age(non-empty values)'
            });
            return;
        }
        if(+enteredUserAge<1)//even though you gave the type of age input field as number it will be always taken in as a string.So add '+' sign infront of entered age to convert it to number
        {
            setError({
                title:'Invalid Age',
                message:'Please enter age(>0)'
            });
            return;
        }
        //props.onAddUser(enteredUsername,enteredAge);
        // setEnteredUsername('');
        // setEnteredAge('');
        props.onAddUser(enteredName,enteredUserAge);
        nameInputRef.current.value='';
        ageInputRef.current.value='';

    }
    return(
        <React.Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
        <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">UserName</label>
            <input id='username' type="text" ref={nameInputRef}></input>
            <label htmlFor="age">Age(in Years)</label>
            <input id='age' type="number" ref={ageInputRef}></input>
            <Button type="submit">Add User</Button>
        </form>
        </Card>
        </React.Fragment>
    )
}
export default AddUser;