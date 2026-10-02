import * as Yup from "yup";

export const registerSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format (e.g., name@example.com)'
        )
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
        .required("Phone is required"),

    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const loginSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
    newPassword: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("New password is required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("newPassword")],
            "Passwords must match"
        )
        .required("Confirm password is required"),
});
export const adminUserSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must contain 10 digits")
        .required("Phone is required"),

    role: Yup.string()
        .oneOf(["admin", "user"], "Invalid role")
        .required("Role is required"),
});
export const contactSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email address")
        .required("Email is required"),
    phone: Yup.string()
        .trim()
        .min(10, "At least 10 digits")
        .required(),
    subject: Yup.string()
        .trim()
        .min(3, "Subject must contain at least 3 characters")
        .required("Subject is required"),

    message: Yup.string()
        .trim()
        .min(10, "Message must contain at least 10 characters")
        .required("Message is required"),
});
export const profileSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),

    phone: Yup.string(),
});
export const changePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .required("Current password is required"),

    newPassword: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/[A-Z]/, "Include an uppercase letter")
        .matches(/[a-z]/, "Include a lowercase letter")
        .matches(/[0-9]/, "Include a number")
        .required("New password is required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("newPassword")],
            "Passwords must match"
        )
        .required("Confirm password is required"),
});
export const serviceSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required("Title is required"),

    shortDescription: Yup.string()
        .trim()
        .required("Short description is required"),

    description: Yup.string()
        .trim()
        .min(10, "Description must contain at least 10 characters")
        .required("Description is required"),

    price: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Price is required"),

    currency: Yup.string()
        .trim()
        .required("Currency is required"),

    image: Yup.mixed()
        .nullable()
        .test(
            "fileType",
            "Only image files are allowed",
            (file) => {
                if (!file) return true;

                return file instanceof File &&
                    file.type.startsWith("image/");
            }
        ),

    tags: Yup.string(),

    isActive: Yup.boolean().required(),
});