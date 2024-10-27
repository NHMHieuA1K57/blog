import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = ({ className }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);
  const navigate = useNavigate(); // dùng để điều hướng

  useEffect(() => {
    const fetchResults = async () => {
      if (searchKeyword.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://localhost:9999/post/search?query=${searchKeyword}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm bài viết:", error);
        setError("Không tìm thấy bài viết nào.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword]);

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Đóng kết quả tìm kiếm khi click ra ngoài
  const handleClickOutside = (e) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (postId) => {
    navigate(`/detail/${postId}`);
  };

  return (
    <div className={`flex flex-col gap-y-2.5 relative ${className}`}>
      <form className="flex flex-col gap-y-2.5">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
            type="text"
            placeholder="Search article"
            value={searchKeyword}
            onChange={handleChange}
          />
        </div>
      </form>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {searchResults.length > 0 && (
        <div ref={resultsRef} className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg absolute w-full z-10 top-full">
          {searchResults.map((post) => (
            <div
              key={post._id}
              className="p-4 border-b last:border-b-0 cursor-pointer"
              onClick={() => handleResultClick(post._id)}
            >
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content ? post.content.slice(0, 100) : "Không có nội dung"}...</p>
              {/* <p>Danh mục: {post.category ? post.category.name : "Chưa có danh mục"}</p> */}
              {/* <p>Tác giả: {post.author ? post.author.name : "Chưa có tác giả"}</p> */}
              {/* <p>Ngày đăng: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Không rõ"}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
