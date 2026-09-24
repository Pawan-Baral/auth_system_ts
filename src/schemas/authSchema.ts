import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(8, "At least 8 characters required!"),
});

export const registerSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
        .required("Phone is required"),

    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "Passwords must match"
        )
        .required("Confirm your password"),
});