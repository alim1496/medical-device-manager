import React, { FC } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikErrors,
  FormikTouched,
} from "formik";
import axios from "axios";
import "../assets/styles/login.scss";

interface MyFormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  return (
    <div className="login-container">
      <h3>LOGIN</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          axios
            .post("http://163.47.115.230:30000/api/login", values)
            .then(({ data: { access_token } }) => {
              localStorage.setItem("jwt-token", access_token);
              window.location.href = "/";
            })
            .catch((err) => console.log(err));
        }}
      >
        <Form>
          <Field id="email" name="email" placeholder="email" type="email" />
          <Field
            id="password"
            name="password"
            placeholder="password"
            type="password"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
