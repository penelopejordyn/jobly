import React, { useContext } from "react";
import JoblyApi from "../api/JoblyApi";
import AuthContext from '../AuthContext';
import { Card } from '../Common/Card';
import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import { Heading, LightMiceType } from '../Common/Type';
import { Label } from '../Common/Label';
import UserCard from "./UserCard";
import { Div } from "../Common/Div";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/** Profile - Form for updating the profile;
 *  requires a valid password;
 *  Username cannot be updated;
 */
function Profile() {

  const { userInfo, setUserInfo } = useContext(AuthContext);

  // save current job info so data persists when updating userInfo
  const jobs = userInfo.jobs;

  const initialFormValues = {
    first_name: userInfo.first_name || "",
    last_name: userInfo.last_name || "",
    email: userInfo.email || "",
    photo_url: userInfo.photo_url || "",
    username: userInfo.username,
    password: "",
  };

  const UpdateSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be less than 50 characters'),
    last_name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be less than 50 characters'),
    email: Yup.string()
      .email('Invalid email address'),
    photo_url: Yup.string()
      .url('Must be a valid web address starting with "http://"'),
    password: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .max(50, 'Must be less than 50 characters')
      .required('Required')
  });

  const submitUpdates = async (values, setStatus, setFieldValue) => {

    let profileData = {
      username: values.username,
      first_name: values.first_name || undefined,
      last_name: values.last_name || undefined,
      email: values.email || undefined,
      photo_url: values.photo_url || undefined,
      password: values.password
    };
    let updatedUser;
    try {
      updatedUser = await JoblyApi.updateUser(profileData);
      setFieldValue("password", "", false);
      setStatus("Update successful!");
    }
    catch (err) {
      setStatus(err);
    }
    setUserInfo({ ...updatedUser, jobs });
  }

  return (
    <>
      <UserCard userInfo={userInfo} />
      <Card column>
        <Heading>Edit Profile</Heading>
        <Div margin="0 16px 0 0">
          <Formik
            initialValues={initialFormValues}
            validationSchema={UpdateSchema}
            onSubmit={(values, { setStatus, setFieldValue }) => submitUpdates(values, setStatus, setFieldValue)}
          >
            {({
              values,
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid
            }) => (
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="username">Username</Label>
                  <ErrorMessage name="username" render={msg =>
                    <LightMiceType display="inline-block">{msg}</LightMiceType>} />
                  <Input disabled
                    name="username"
                    placeholder="username"
                    onBlur={handleBlur}
                    value={values.username}
                    autoComplete="username"
                  />
                  <Label htmlFor="first_name">First Name</Label>
                  <ErrorMessage name="first_name" render={msg =>
                    <LightMiceType margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                  <Input
                    onChange={handleChange}
                    name="first_name"
                    placeholder="first_name"
                    onBlur={handleBlur}
                    value={values.first_name}
                    autoComplete="given-name"
                  />
                  <Label htmlFor="last_name">Last Name</Label>
                  <ErrorMessage name="last_name" render={msg =>
                    <LightMiceType margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                  <Input
                    onChange={handleChange}
                    name="last_name"
                    placeholder="last_name"
                    onBlur={handleBlur}
                    autoComplete="family-name"
                    value={values.last_name}
                  />
                  <Label htmlFor="email">Email</Label>
                  <ErrorMessage name="email" render={msg =>
                    <LightMiceType margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                  <Input
                    onChange={handleChange}
                    name="email"
                    placeholder="email"
                    onBlur={handleBlur}
                    value={values.email}
                    autoComplete="email"
                  />
                  <Label htmlFor="photo_url">Photo URL</Label>
                  <ErrorMessage name="photo_url" render={msg =>
                    <LightMiceType margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                  <Input
                    onChange={handleChange}
                    name="photo_url"
                    placeholder="URL for your profile picture"
                    onBlur={handleBlur}
                    value={values.photo_url}
                    autoComplete="photo"
                  />
                  <Label htmlFor="password">Re-enter Password</Label>
                  <ErrorMessage name="password" render={msg =>
                    <LightMiceType margin="0 0 0 1rem" display="inline-block">{msg}</LightMiceType>} />
                  <Input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    placeholder="password"
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="current-password"
                  />
                  <Div margin="1rem 0 0" display="flex">
                    <Button type="submit" disabled={!isValid || isSubmitting} id="updateProfile">
                      Save Changes
                    </Button>
                    <Div margin="0 0 0 1rem" display="flex" align="center">
                      <LightMiceType>{status}</LightMiceType>
                    </Div>
                  </Div>
                </form>
            )}
          </Formik>
        </Div>
      </Card>
    </>
  );
}

export default Profile;