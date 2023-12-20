import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from "../Common/Card";
import { Label } from "../Common/Label";
import { Input } from "../Common/Input";
import { Heading, LightMiceType } from '../Common/Type';
import { Div } from '../Common/Div';
import { Button } from '../Common/Button';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/**
 *
 * @param {Function} signup: handles new user signup call to DB
 */
function Signup({ signup }) {

  const history = useHistory();

  const initialFormValues = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: ""
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    first_name: Yup.string()
      .min(2, 'Must be at least 3 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Must be at least 3 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required')
  });

  const cleanupApiErrors = errors => {
    console.log(errors)
    if (errors.length === 1) {
      return errors[0];
    }
    else {
      return errors.join("\n");
    }
  }

  const handleSignup = async (values, setStatus) => {
    let result = await signup(values);
    if (result.login) {
      history.push("/companies");
    } else {
      const apiErrors = cleanupApiErrors(result.err);
      setStatus(apiErrors);
    }
  };

  return (
    <Card column>
      <Heading>
        Sign Up
      </Heading>
      <LightMiceType>All fields are required.</LightMiceType>
      <Div margin="0 16px 0 0">
        <Formik
          initialValues={initialFormValues}
          validationSchema={SignupSchema}
          onSubmit={(values, { setStatus }) => handleSignup(values, setStatus)}
        >
          {({
            values,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
            setStatus
          }) => (
              <form onSubmit={handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <ErrorMessage name="username" render={msg =>
                    <LightMiceType color="tomato" margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                <Input
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                />
                <Label htmlFor="password">Password</Label>
                <ErrorMessage name="password" render={msg =>
                    <LightMiceType color="tomato" margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="new-password"
                />
                <Label htmlFor="email">Email</Label>
                <ErrorMessage name="email" render={msg =>
                    <LightMiceType color="tomato" margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                />
                <Label htmlFor="first_name">First Name</Label>
                <ErrorMessage name="first_name" render={msg =>
                    <LightMiceType color="tomato" margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                <Input
                  onChange={handleChange}
                  name="first_name"
                  onBlur={handleBlur}
                  value={values.first_name}
                  autoComplete="given-name"
                />
                <Label htmlFor="last_name">Last Name</Label>
                <ErrorMessage name="last_name" render={msg =>
                    <LightMiceType color="tomato" margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                <Input
                  onChange={handleChange}
                  name="last_name"
                  onBlur={handleBlur}
                  value={values.last_name}
                  autoComplete="family-name"
                />
                <Div margin="1rem 0 0" display="flex">
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Sign Up
                   </Button>
                  <Div margin="0 0 0 1rem" display="flex" align="center">
                    <LightMiceType color="tomato">{status}</LightMiceType>
                  </Div>
                </Div>
              </form>
            )}
        </Formik>
      </Div>
    </Card>
  )
}

export default Signup;