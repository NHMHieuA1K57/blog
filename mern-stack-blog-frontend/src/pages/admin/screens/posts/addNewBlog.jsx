import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import Alert from "../../../../components/Alert";
import useGetDataCategory from "../../../../hooks/useGetDataCategory";
import useGetDataPostDetail from "../../../../hooks/useGetDataPostDetail";

const BlogPostForm = () => {
  const { postId } = useParams();
  const [alert, setAlert] = useState(null);

  const fileInputRef = useRef(null);

  const { data: categoriesData, isLoading: isLoadingCate } =
    useGetDataCategory();
  const categories = categoriesData?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const { data: postDetail } = useGetDataPostDetail(postId);

  const initialValues = useMemo(
    () => ({
      title: postDetail?.title || "",
      content: postDetail?.content || "",
      image: postDetail?.images?.[0] || null,
      category:
        categories.find((cat) => cat.label === postDetail?.category) || null,
    }),
    [postDetail, categories]
  );

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    content: Yup.string().trim().required("Content is required"),
    image: Yup.mixed().required("Image is required"),
    category: Yup.object().nullable().required("Category is required"),
  });

  const handleImageChange = (setFieldValue) => (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFieldValue("image", e.target.result);
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
    const isUpdate = Boolean(postId);
    const confirmMessage = isUpdate
      ? "Are you sure you want to update this post?"
      : "Are you sure you want to create this post?";
    const confirmAction = window.confirm(confirmMessage);
    if (!confirmAction) return;

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category.value);

    if (values.image) {
      const base64Image = values.image.split(",")[1];
      if (base64Image) {
        const blob = await fetch(`data:image/png;base64,${base64Image}`).then(
          (res) => res.blob()
        );
        formData.append("images", blob, "image.png");
      }
    }

    try {
      const url = isUpdate
        ? `http://localhost:9999/blog/update-post/${postId}`
        : "http://localhost:9999/blog/addPost";
      const method = isUpdate ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setAlert({
        type: "success",
        message: isUpdate
          ? "Post updated successfully!"
          : "Post created successfully!",
      });
    } catch (error) {
      console.error("Error response data:", error.response?.data);
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          `Failed to ${isUpdate ? "update" : "create"} post.`,
      });
    }
  };

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors }) => (
            <Form className="w-full max-w-2xl transform space-y-6 rounded-lg bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]">
              <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                {postId ? "Update Post" : "Create a New Blog Post"}
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
                        maxLength={100}
                        className={`mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                          errors.title ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your blog post title"
                      />
                    )}
                  </Field>
                  <p className="mt-1 text-sm text-gray-500">
                    {values.title.length}/100 characters
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700">
                    Categories
                  </label>
                  <Select
                    className="z-10"
                    options={categories}
                    onChange={(option) => setFieldValue("category", option)}
                    isLoading={isLoadingCate}
                    value={values.category}
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-lg font-bold text-gray-700"
                  >
                    Content
                  </label>
                  <Field name="content">
                    {({ field }) => (
                      <textarea
                        {...field}
                        maxLength={5000}
                        className={`mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                          errors.content ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your blog post content"
                      />
                    )}
                  </Field>
                  <p className="mt-1 text-sm text-gray-500">
                    {values.content.length}/5000 characters
                  </p>
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
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        <input
                          type="file"
                          className="mt-2 w-full cursor-pointer text-sm text-gray-500 file:rounded-full file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:transition file:hover:bg-indigo-700"
                          onChange={handleImageChange(setFieldValue)}
                          ref={fileInputRef}
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {postId ? "Update Post" : "Create Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default BlogPostForm;
