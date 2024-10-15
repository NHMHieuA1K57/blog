import React, { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import Select from "react-select";
import MainLayout from "../../components/MainLayout";
import Editor from "../../components/editor/Editor";
import { categories } from "../../constants/dataMock";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic here
      console.log("Form submitted", { title, content, image });
    } else {
      console.log("Form has errors", errors);
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <form
          onSubmit={handleSubmit}
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
                className="block font-bold text-gray-700 text-lg"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="Enter your blog post title"
                aria-describedby="titleError"
                maxLength={100}
              />
              <p className="mt-1 text-sm text-gray-500">
                {title.length}/100 characters
              </p>
              {errors.title && (
                <p
                  id="titleError"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="title"
                className="block font-bold text-gray-700 text-lg"
              >
                Categories
              </label>
              {/* <MultiSelectTagDropdown
                defaultValue={[categories[0], categories[1]]}
                options={categories}
              /> */}
              <Select
              className="z-10"
                isMulti
                options={categories}
                defaultValue={[categories[0], categories[1]]}
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block font-bold text-gray-700 text-lg"
              >
                Content
              </label>
              {/* <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                rows={6}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.content ? "border-red-500" : ""
                }`}
                placeholder="Write your blog post content here"
                aria-describedby="contentError"
                maxLength={5000}
              ></textarea> */}
              <Editor content={content} editable={true}/>
              <p className="mt-1 text-sm text-gray-500">
                {content.length}/5000 characters
              </p>
              {errors.content && (
                <p
                  id="contentError"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.content}
                </p>
              )}
            </div>

            <div>
              <label className="block font-bold text-gray-700 text-lg">
                Featured Image
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="max-h-48 rounded"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
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
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          accept="image/*"
                          aria-describedby="imageError"
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
              {errors.image && (
                <p
                  id="imageError"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.image}
                </p>
              )}
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
        </form>
      </div>
    </MainLayout>
  );
};

export default BlogPostForm;
