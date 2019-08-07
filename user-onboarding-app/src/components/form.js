import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, status}) => {
 const [ users, setUsers ] = useState([]);
  console.log('users', users)

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);



console.log(users)
  return (
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
          <Field type="text" name="name" placeholder="name"/>

          {touched.name && errors.name && (
          <p className="error">{errors.name}</p>)}

          <Field type="text" name="email" placeholder="email"/>

          {touched.email && errors.email && (
          <p className="error">{errors.email}</p>)}

          <Field type="password" name="password" placeholder="password"/>

          {touched.password && errors.password && (
          <p className="error">{errors.password}</p>)}
          
          <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="terms" />
          <span className="checkmark" />
        </label>
        

        <button type="submit">Submit!</button>
        {users.map(user => (
        <p key={user.name}>{user.email}</p>
      ))}
      </Form>
    </div>
  );
};




const FormikUserForm = withFormik({

mapPropstoValues(values) {
    return {
        terms: values.terms || false,
      name: values.name || "",
      email: values.email || "",
      password: values.password || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('nope'),
    email: Yup.string().required('nope'),
    password: Yup.string().required('nope'),
  }),

  handleSubmit(values, {setStatus}) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => setStatus(res.data))
      .catch(err => console.log(err.response));
  }

})(UserForm);
export default FormikUserForm;


