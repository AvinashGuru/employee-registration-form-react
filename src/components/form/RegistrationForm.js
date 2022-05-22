import React, { useEffect, useReducer, useState } from 'react';
import './RegistrationForm.css';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../layout/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllDepartment, registerEmployee } from '../lib/api';
import ModalComp from '../modal/Modal';


const empNoReducer = (state, dispatcherAction) => {
  let isValidVal = true;
  let valueFromField ='' ;
  let errMsg = null;
  if(dispatcherAction.action === 'USER_INPUT'){
    valueFromField= dispatcherAction.val;
  }else if(dispatcherAction.action === 'VALIDATE'){
    valueFromField= state.value;
  }else if(dispatcherAction.action === 'CLEAR'){
    valueFromField= '';
    isValidVal = false;
  }
 
  if(dispatcherAction.action === 'USER_INPUT' || dispatcherAction.action === 'VALIDATE'){
    if(!valueFromField){
      isValidVal = false;
      errMsg = 'Employee Number is Mandatory';
    }else{
      if(valueFromField.length > 10){
        isValidVal = false;
        errMsg = 'Employee Number should not be more than 10 digits';
      }
    } 
  }
  return { value : valueFromField, isValid :isValidVal, message:errMsg};
}

const empNameReducer = (state, dispatcherAction) => {
  let isValidVal = true;
  let valueFromField ='' ;
  let errMsg = null;
  if(dispatcherAction.action === 'USER_INPUT'){
    valueFromField= dispatcherAction.val;
  }else if(dispatcherAction.action === 'VALIDATE'){
    valueFromField= state.value;
  }else if(dispatcherAction.action === 'CLEAR'){
    valueFromField= '';
    isValidVal = false;
  }
 
  if(dispatcherAction.action === 'USER_INPUT' || dispatcherAction.action === 'VALIDATE'){
    if(!valueFromField){
      isValidVal = false;
      errMsg = 'Employee Name is Mandatory';
    }else{
      if(valueFromField.length > 100){
        isValidVal = false;
        errMsg = 'Employee Name should not be more than 10 characters';
      }
    }
  }  
  return { value : valueFromField, isValid :isValidVal, message:errMsg};
}

const dojReducer = (state, dispatcherAction) => {
  let isValidVal = true;
  let valueFromField ='' ;
  let errMsg = null;
  if(dispatcherAction.action === 'USER_INPUT'){
    valueFromField= dispatcherAction.val;
  }else if(dispatcherAction.action === 'VALIDATE'){
    valueFromField= state.value;
  }else if(dispatcherAction.action === 'CLEAR'){
    valueFromField= '';
    isValidVal = false;
  }
 
  if(dispatcherAction.action === 'USER_INPUT' || dispatcherAction.action === 'VALIDATE'){
    if(!valueFromField){
      isValidVal = false;
      errMsg = 'Date Of Joining is Mandatory';
    }  
  }
  return { value : valueFromField, isValid :isValidVal, message:errMsg};
}

const deptReducer = (state, dispatcherAction) => {
  let isValidVal = true;
  let valueFromField ='' ;
  let errMsg = null;
  if(dispatcherAction.action === 'USER_INPUT'){
    valueFromField= dispatcherAction.val;
  }else if(dispatcherAction.action === 'VALIDATE'){
    valueFromField= state.value;
  }else if(dispatcherAction.action === 'CLEAR'){
    valueFromField= '';
    isValidVal = false;
  }
 
  if(dispatcherAction.action === 'USER_INPUT' || dispatcherAction.action === 'VALIDATE'){
    if(!valueFromField){
      isValidVal = false;
      errMsg = 'Department is Mandatory';
    }
  }

  return { value : valueFromField, isValid :isValidVal, message:errMsg};
}

const salaryReducer = (state, dispatcherAction) => {
  let isValidVal = true;
  let valueFromField ='' ;
  let errMsg = null;
  if(dispatcherAction.action === 'USER_INPUT'){
    valueFromField= dispatcherAction.val;
  }else if(dispatcherAction.action === 'VALIDATE'){
    valueFromField= state.value;
  }else if(dispatcherAction.action === 'CLEAR'){
    valueFromField= '';
    isValidVal = false;
  }
  if(dispatcherAction.action === 'USER_INPUT' || dispatcherAction.action === 'VALIDATE'){
    if(!valueFromField){
      isValidVal = false;
      errMsg = 'Salary is Mandatory';
    }else{
      if(valueFromField.length > 10){
        isValidVal = false;
        errMsg = 'Salary should not be more than 10 digits';
      }
    }  
  }
  return { value : valueFromField, isValid :isValidVal, message:errMsg};
}

const RegistrationForm = (props) => {

  const[isFormValid,setFormIsValid] = useState(false);
  const[empNoState, empNoDispatcher]  = useReducer(empNoReducer, {isValid:false,value:'', message:null});
  const[empNameState, empNameDispatcher]  = useReducer(empNameReducer, {isValid:false,value:'', message:null});
  const[dojState, dojDispatcher]  = useReducer(dojReducer, {isValid:false,value:'',message:null});
  const[deptState, deptDispatcher]  = useReducer(deptReducer, {isValid:false,value:'', message:null});
  const[salaryState, salaryDispatcher]  = useReducer(salaryReducer, {isValid:false,value:'', message:null});
  const [modalShow, setModalShow] = useState(false);

  const modalShowHandler = (bool) => {
    setModalShow(bool);
  }
  const {sendRequest: getDept, status: deptRetStatus, data: loadedDept} = useHttp(getAllDepartment, modalShowHandler, false);
  const {sendRequest: registerEmployeeSubmit, status: empSubmitStatus, data: empSubmitResp, error: empSubmitErr} = useHttp(registerEmployee, modalShowHandler, true);

  useEffect(() => {
    getDept();
  },[getDept]);

  useEffect(() => {
    setFormIsValid(
      empNoState.isValid && empNameState.isValid && dojState.isValid && deptState.isValid && salaryState.isValid
    );
  }, [empNoState, empNameState, dojState, deptState, salaryState]);

  

  const empNoChangeHandler = (event) => {
    empNoDispatcher({action :'USER_INPUT', val : event.target.value});
  };

  const empNoValidateHandler = () => {
    empNoDispatcher({action :'VALIDATE'});
  };

  const empNameChangeHandler = (event) => {
    empNameDispatcher({action :'USER_INPUT', val : event.target.value});
  };

  const empNameValidateHandler = () => {
    empNameDispatcher({action :'VALIDATE'});
  };

  const dojChangeHandler = (event) => {
    dojDispatcher({action :'USER_INPUT', val : event.target.value});
  };

  const dojValidateHandler = () => {
    dojDispatcher({action :'VALIDATE'});
  };

  const deptChangeHandler = (event) => {
    deptDispatcher({action :'USER_INPUT', val : event.target.value});
  };

  const deptValidateHandler = () => {
    deptDispatcher({action :'VALIDATE'});
  };

  const salaryChangeHandler = (event) => {
    salaryDispatcher({action :'USER_INPUT', val : event.target.value});
  };

  const salaryValidateHandler = () => {
    salaryDispatcher({action :'VALIDATE'});
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const empObj = {
      "employeeNum" : empNoState.value,
      "employeeName" : empNameState.value,
      "dateOfJoining" : dojState.value,
      "department" : deptState.value,
      "salary" : salaryState.value
    }
    registerEmployeeSubmit(empObj);
  };

  const clearFormHandler = (event) => {
    event.preventDefault();
    empNoDispatcher({action :'CLEAR'});
    empNameDispatcher({action :'CLEAR'});
    dojDispatcher({action :'CLEAR'});
    deptDispatcher({action :'CLEAR'});
    salaryDispatcher({action :'CLEAR'});
  };

  if(deptRetStatus === 'pending' || empSubmitStatus === 'pending'){
    return (
    <div className='centered'>
        <LoadingSpinner/>
    </div>);
  }

  if(deptRetStatus === 'completed' || empSubmitStatus === 'completed'){
        return (
          <div>
                <form className='form'>
                  <div className='control'><span className="errMsg">{empNoState.message}</span></div>  
                  <div className='control'>
                    <label htmlFor='empNo'>Employee No<span className="mandatory"> *</span></label>
                    <input type='number' id='empNo' onChange={empNoChangeHandler} onBlur={empNoValidateHandler}value={empNoState.value} />
                  </div>
                  <div className='control'><span className="errMsg">{empNameState.message}</span></div>  
                  <div className='control'>
                    <label htmlFor='empName'>Employee Name<span className="mandatory"> *</span></label>
                    <input type='text' id='empName'  onChange={empNameChangeHandler} onBlur={empNameValidateHandler} value={empNameState.value}/>
                  </div>
                  <div className='control'><span className="errMsg">{dojState.message}</span></div>  
                  <div className='control'>
                    <label htmlFor='doj'>Date Of Joining <span className="mandatory"> *</span></label>
                    <input placeholder='DD/MM/YYYY' type='text' id='doj' onChange={dojChangeHandler} onBlur={dojValidateHandler} value={dojState.value} />
                  </div>
                  <div className='control'><span className="errMsg">{deptState.message}</span></div>  
                  <div className='control'>
                    <label htmlFor='dept'>Department<span className="mandatory"> *</span></label>
                    <select  id='dept' onChange={deptChangeHandler} onBlur={deptValidateHandler} value={deptState.value}>
                      <option value =''>Select Department</option>
                        {
                          loadedDept.map((dept) => (
                            <option key={dept.departmentId} value = {dept.departmentId}>{dept.departmentName}</option>
                          ))
                        }
                     </select>
                  </div>
                  <div className='control'><span className="errMsg">{salaryState.message}</span></div>  
                  <div className='control'>
                    <label htmlFor='salary'>Salary<span className="mandatory"> *</span></label>
                    <input type='number' id='salary'onChange={salaryChangeHandler} onBlur={salaryValidateHandler}  value={salaryState.value} />
                  </div>
                  <div className='actionsGroup'>
                    <div className='actions'>
                      <Button variant="primary" className='primaryBtn' onClick={clearFormHandler}>Clear</Button>
                    </div>
                    <div className='actions'>
                      <Button  variant="primary" className='primaryBtn' disabled={!isFormValid} onClick={submitFormHandler}>Submit</Button>
                    </div>
                  </div>            
                </form>
                {empSubmitResp &&  <ModalComp modalShow = {modalShow} modalHandler = {modalShowHandler} modalContent = {empSubmitResp} />}
                {empSubmitErr &&   <ModalComp modalShow = {modalShow} modalHandler = {modalShowHandler} modalContent = {empSubmitErr} />}
              </div>
              
        )
   }

   
      
}

export default RegistrationForm