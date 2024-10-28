import React, { useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Editor from "../../../../components/editor/Editor";
import useGetDataCategory from "../../../../hooks/useGetDataCategory";
import axios from "axios";

const BlogPostForm = () => {
  const fileInputRef = useRef(null);
  const { data, isLoading } = useGetDataCategory();
  const categories = data.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const initialValues = {
    title: "",
    content: "",
    image: null,
    category: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    content: Yup.string().trim().required("Content is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleImageChange = (setFieldValue) => (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFieldValue("image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setFieldValue) => () => {
    setFieldValue("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
  
    // Khởi tạo FormData
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category.value); // Chỉ lấy ID từ category
  
    // Xử lý hình ảnh nếu có
    if (values.image) {
      const base64Image = values.image.split(",")[1]; // Tách chuỗi Base64 nếu cần thiết
      // Nếu backend yêu cầu file, bạn cần tạo một Blob và thêm vào FormData
      const blob = await fetch(`data:image/png;base64,${base64Image}`).then(res => res.blob());
      formData.append("images", blob, 'image.png'); // 'images' là tên bạn muốn sử dụng cho file trong req.files
    }
  
    try {
      await axios.post("http://localhost:9999/blog/addPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error response data:", error.response?.data); 
      alert("Failed to create post.");
    }
  };
  
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors }) => (
          <Form
            className="w-full max-w-2xl transform space-y-6 rounded-lg bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
            aria-label="Create a new blog post"
          >
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Create a New Blog Post
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-bold text-gray-700"
                >
                  Title
                </label>
                <Field name="title">
                  {({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className={`mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.title ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your blog post title"
                      maxLength={100}
                    />
                  )}
                </Field>
                <p className="mt-1 text-sm text-gray-500">
                  {values.title.length}/100 characters
                </p>
                <ErrorMessage name="title">
                  {(msg) => (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700">
                  Categories
                </label>
                <Select
                  className="z-10"
                  options={categories}
                  onChange={(option) => setFieldValue("category", option)}
                  isLoading={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-lg font-bold text-gray-700"
                >
                  Content
                </label>
                {/* <Field name="content">
                  {({ field }) => (
                    <Editor content={values.content} editable={true} />
                  )}
                </Field> */}
                <Field name="content">
                  {({ field }) => (
                    <textarea
                      type="text"
                      {...field}
                      className={`mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                        errors.title ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your blog post title"
                      maxLength={5000}
                    />
                  )}
                </Field>
                <p className="mt-1 text-sm text-gray-500">
                  {values.content.length}/5000 characters
                </p>
                <ErrorMessage name="content">
                  {(msg) => (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700">
                  Featured Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  {values.image ? (
                    <div className="relative">
                      <img
                        src={values.image}
                        alt="Preview"
                        className="max-h-48 rounded"
                      />
                      <button
                        type="button"
                        onClick={removeImage(setFieldValue)}
                        className="absolute top-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                        aria-label="Remove image"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange(setFieldValue)}
                            ref={fileInputRef}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <ErrorMessage name="image">
                  {(msg) => (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogPostForm;
