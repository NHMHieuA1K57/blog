import React,{ useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const userState = useSelector((state) => state.user);

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: ({ name, email, password }) => {
  //     return signup({ name, email, password });
  //   },
  //   onSuccess: (data) => {
  //     dispatch(userActions.setUserInfo(data));
  //     localStorage.setItem("account", JSON.stringify(data));
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  // useEffect(() => {
  //   if (userState.userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userState.userInfo]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  //   watch,
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   mode: "onChange",
  // });

  // const submitHandler = (data) => {
  //   const { name, email, password } = data;
  //   mutate({ name, email, password });
  // };

  // const password = watch("password");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    // Đơn giản hóa kiểm tra email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setError("");
    setMessage("");

    // Kiểm tra dữ liệu
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:9999/account/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Registration successful! You can now login.");
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError("Registration failed. Please try again.");
        setMessage("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-center font-roboto text-2xl font-bold text-dark-hard">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="name"
                className="block font-semibold text-[#5a7184]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded border p-2"
              />
            </div>

            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="email"
                className="block font-semibold text-[#5a7184]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded border p-2"
              />
            </div>

            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="password"
                className="block font-semibold text-[#5a7184]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded border p-2"
              />
            </div>

            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold text-[#5a7184]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="rounded border p-2"
              />
            </div>

            {error && <p className="mb-4 text-red-500">{error}</p>}
            {message && <p className="mb-4 text-green-500">{message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mb-6 w-full rounded-lg bg-primary py-4 px-8 text-lg font-bold text-white ${
                isSubmitting ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
