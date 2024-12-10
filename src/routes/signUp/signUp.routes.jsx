const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formFields;

    if (!name || !email || !password) {
        setError("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    try {
        setLoading(true);
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { name });
        alert("Account created successfully!");
        resetFormFields();
        navigate("/profilepage");
    } catch (error) {
        const errorMessage =
            error.code === "auth/email-already-in-use"
                ? "Email already in use. Please login instead."
                : "Something went wrong. Please try again.";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};
