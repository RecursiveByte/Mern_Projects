import React, { useEffect, useState } from "react";
import { getUserDetails } from "../utils/helper";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmModal from "./ConfirmDelete";
import EditBookModal from "./Editbook";

const CurrBook = ({
  updateCurrBook,
  currBook,
  isClick,
  setIsClick,
  setCurrBook,
  setTriggerRerender,
  triggerRerender,
}) => {
  const [user, setUser] = useState({});

  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    try {
      const data = await getUserDetails();
      setUser(data);
    } catch (err) {
      console.error("Error in fetchUser:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [triggerRerender]);

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleEdit = (review_id, comment, rating) => {
    setEditingId(review_id);
    setComment(comment);
    setRating(rating);
  };

  const handleEditReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please enter a valid rating between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const res = await axios.patch(
        `${url}/editReview`,
        {
          review_id: editingId,
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Review updated successfully!");
      setIsEditing(false);
      setEditingId(0);
      setComment("");
      setRating(0);
      setTriggerRerender((prev) => !prev);
      await updateCurrBook();
    } catch (err) {
      console.error("Error editing review:", err);
      toast.error(err.response?.data?.message || "Error updating review");
    }
  };

  useEffect(() => {
  setCurrBook(currBook);
  }, [triggerRerender])
  

  const changeShowInput = () => setShowInput(true);

  const handleAddReview = async () => {
    setShowInput(true);
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please enter a valid rating between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/addReview`,
        {
          book_id: currBook.book_id,
          rating,
          comment,
        },
        { withCredentials: true }
      );

      toast.success("Review added successfully!");
      setTriggerRerender((prev) => !prev);
      setShowInput(false);
      setComment("");
      setRating(0);
      await updateCurrBook();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding review");
      console.error("Error in handleAdd:", err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${url}/deleteReview`, {
        data: { review_id: reviewId },
        withCredentials: true,
      });
      toast.success("Review deleted");
      await updateCurrBook();
      setTriggerRerender((prev) => !prev);
    } catch (err) {
      toast.error("Error deleting review");
      console.log(err);
    }
  };

  const handleDeleteBook = async (book_id) => {
    try {
      const response = await axios.delete(`${url}/deleteBook`, {
        data: { book_id },
        withCredentials: true,
      });
      
      setCurrBook({});
      setIsClick(false);
      setIsDeleteClick(false);
      setTriggerRerender((prev) => !prev);
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting book:", error);
      toast.error("Failed to delete the book. Please try again.");
    }
  };

  useEffect(() => {
    if (isDeleteClick) {
      handleDeleteBook(currBook.book_id);
    }
  }, [isDeleteClick]);
  

  return (
    <div className="z-50 top-20 lg:top-30 w-[90vw] h-[80vh] lg:w-[80vw] lg:h-[75vh] fixed overflow-y-auto rounded-lg  shadow-xl bg-white">
      <div className="flex absolute right-0 px-2">
        <span
          onClick={() => {
            setIsClick(false);
          }}
          className="bg-gray-900 w-5 h-5 flex justify-center items-center cursor-pointer text-white text-xs rounded-full"
        >
          X
        </span>
      </div>
      {showDelete && (
        <ConfirmModal
          isDeleteClick={isDeleteClick}
          setIsDeleteClick={setIsDeleteClick}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
        />
      )}
      {Object.keys(currBook).length !== 0 && (
        <div className="w-full h-full flex  flex-col sm:flex-row overflow-y-auto">
          <div className="leftSide w-full sm:w-1/2 h-[60%] sm:h-full  flex flex-col gap-1 items-center overflow-y-auto justify-center bg-white">
            <div className="img sm:apect-[4/3]">
              <img src={currBook.image_url} className="rounded-lg shadow-md" />
            </div>
            <div className="textPart w-[60%] h-[40%] text-gray-800">
              <div className="title mb-2">
                <div className="text-xl sm:text-2xl font-semibold">Title:</div>
                <div className="text-sm sm:text-xl">{currBook.title}</div>
              </div>

              <div className="author mb-2">
                <div className="text-xl sm:text-2xl font-semibold">Author:</div>
                <div className="text-sm sm:text-xl">{currBook.author}</div>
              </div>

              <div className="avgRating">
                <div className="text-xl sm:text-2xl font-semibold">
                  Average ratings:
                </div>
                <div className="text-sm sm:text-xl">{currBook.avgRatings}</div>
              </div>
            </div>
            {showEdit && (
              <EditBookModal updateCurrBook={updateCurrBook} currBook={currBook} setShowEdit={setShowEdit}/>
            )}
            {user?.userData?.role === "admin" && (
              <div className="flex gap-4 p-2 ">
                <button onClick={() => setShowEdit(true)} className="bg-orange-500 px-4 rounded">Edit </button>
                <button
                  onClick={() =>
                    isDeleteClick
                      ? handleDeleteBook(currBook.book_id)
                      : setShowDelete(true)
                  }
                  className="bg-red-500 px-1 rounded  text-white"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="rightSide w-full sm:w-1/2 h-[40%] sm:h-full bg-white">
            <h1 className="text-center sm:text-2xl lg:text-5xl font-semibold text-gray-800 mt-2">
              Reviews
            </h1>

            <div className="reviews flex flex-col gap-4 p-4 bg-white rounded-lg">
              {currBook.reviews.length > 0 ? (
                currBook.reviews.map((ele) => {
                  const isCurrentUser =
                    user?.userData?.role === "user" &&
                    user?.userData?.id === ele.user_id;

                  return (
                    <div key={ele.id}>
                      {isEditing && editingId === ele.id ? (
                        <div className="flex flex-col gap-3 px-4 mt-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="rating"
                              className="text-gray-700 font-medium mb-1"
                            >
                              Rating (1–5):
                            </label>
                            <input
                              id="rating"
                              type="number"
                              min="1"
                              max="5"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter rating"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="comment"
                              className="text-gray-700 font-medium mb-1"
                            >
                              Comment:
                            </label>
                            <textarea
                              id="comment"
                              rows="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="Write your comment..."
                            />
                          </div>
                          <div>
                            <button
                              onClick={handleEditReview}
                              className="bg-green-600 hover:bg-green-700 text-white font-semibold 
py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                            >
                              Upload Review
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-gray-200 p-4 bg-gray-50 shadow-sm">
                          <div className="text-gray-800 font-semibold mb-1">
                            👤 User:{" "}
                            <span className="text-blue-600">{ele.name}</span>
                          </div>

                          <div className="text-gray-700 mb-1">
                            ⭐ Rating:{" "}
                            <span className="font-medium">{ele.rating}</span>
                          </div>
                          <div className="text-gray-600 italic mb-2">
                            💬 "{ele.comment}"
                          </div>

                          {isCurrentUser && (
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => {
                                  handleEdit(ele.id, ele.comment, ele.rating);
                                  setIsEditing(true);
                                }}
                                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(ele.id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow-sm"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 italic">
                  No reviews yet.
                </div>
              )}
              {showInput && (
                <div className="flex flex-col gap-3 px-4 mt-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="rating"
                      className="text-gray-700 font-medium mb-1"
                    >
                      Rating (1–5):
                    </label>
                    <input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter rating"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="comment"
                      className="text-gray-700 font-medium mb-1"
                    >
                      Comment:
                    </label>
                    <textarea
                      id="comment"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Write your comment..."
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center px-4 mt-4">
                {!showInput ? (
                  <button
                    onClick={changeShowInput}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    Add Review
                  </button>
                ) : (
                  <button
                    onClick={handleAddReview}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                  >
                    Upload Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrBook;
