import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as apiClient from "../../axios/api-client";
import { RegisterFormValuesType } from "../../types/types";

const Register = () => {
  const navigate = useNavigate();

  const { data, mutate, isPending } = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });
  console.log("Register ~ data:", data?.data?.data);

  // FORMIK INITIAL VALUES DEFINITION
  const initialValues: RegisterFormValuesType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // FORMIK VALIDATION SCHEMA
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .required("Password with 6 or more characters required")
      .min(6, "Full name is too short!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // FORM SUBMISSION
  const submitHandler = async (
    values: RegisterFormValuesType,
    { resetForm }: FormikHelpers<RegisterFormValuesType>
  ) => {
    console.log("Register ~ values:", values);
    mutate(values);
    Object.keys(data?.data?.data).length > 0 && resetForm();
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col md:flex-row gap-5">
              <label
                htmlFor="firstName"
                className="text-gray-700 text-sm font-bold flex-1"
              >
                First Name
                <Field
                  id="firstName"
                  className={`${
                    errors.firstName && touched.firstName
                      ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                      : "border rounded w-full py-1 px-2 font-normal"
                  }`}
                  type="text"
                  name="firstName"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="firstName"
                  component="div"
                />
              </label>

              <label
                htmlFor="lastName"
                className="text-gray-700 text-sm font-bold flex-1"
              >
                Last Name
                <Field
                  id="lastName"
                  className={`${
                    errors.lastName && touched.lastName
                      ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                      : "border rounded w-full py-1 px-2 font-normal"
                  }`}
                  type="text"
                  name="lastName"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="lastName"
                  component="div"
                />
              </label>
            </div>

            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              Email
              <Field
                id="email"
                className={`${
                  errors.email && touched.email
                    ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                    : "border rounded w-full py-1 px-2 font-normal"
                }`}
                name="email"
                type="email"
              />
              <ErrorMessage
                className="text-red-500"
                name="email"
                component="div"
              />
            </label>

            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              Password
              <Field
                id="password"
                className={`${
                  errors.password && touched.password
                    ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                    : "border rounded w-full py-1 px-2 font-normal"
                }`}
                name="password"
                type="password"
              />
              <ErrorMessage
                className="text-red-500"
                name="password"
                component="div"
              />
            </label>

            <label
              htmlFor="confirmPassword"
              className="text-gray-700 text-sm font-bold flex-1"
            >
              Confirm Password
              <Field
                id="confirmPassword"
                className={`${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                    : "border rounded w-full py-1 px-2 font-normal"
                }`}
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage
                className="text-red-500"
                name="confirmPassword"
                component="div"
              />
            </label>

            <span className="inline-block my-2">
              <button
                type="submit"
                className="border rounded flex items-center bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                disabled={isPending}
              >
                {isPending ? "Creating Account" : "Create Account"}
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
