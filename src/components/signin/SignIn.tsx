import { useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as apiClient from "../../axios/api-client";
import { setLoggedIn } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { SignInFromValueType } from "../../types/types";
const SignIn = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { data, mutate, isPending } = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      dispatch(setLoggedIn(true));
      navigate(location.state?.from ?? "/");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });

  // FORMIK INITIAL VALUES DEFINITION
  const initialValues: SignInFromValueType = {
    email: "",
    password: "",
  };
  // FORMIK VALIDATION SCHEMA
  const validationSchema = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .required("Password with 6 or more characters required")
      .min(6, "Full name is too short!"),
  });
  // FORM SUBMISSION
  const submitHandler = async (
    values: SignInFromValueType,
    { resetForm }: FormikHelpers<SignInFromValueType>
  ) => {
    // console.log("SignIn ~ values:", values);
    mutate(values);
    !!data && resetForm();
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
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

            <div className="flex items-center justify-between my-5">
              <span className="text-sm">
                Not Registered?
                <Link to="/register" className="underline">
                  Create an account here
                </Link>
              </span>
              <button
                type="submit"
                className="border rounded flex items-center bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                disabled={isPending}
              >
                {isPending ? "Signing In" : "Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
