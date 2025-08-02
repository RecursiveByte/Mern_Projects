import { use, useEffect, useState } from "react";
import { getFinalData } from "../utils/helper";
import CurrBook from "./CurrBook";
import axios from "axios";
import { toast } from "react-toastify";

const BooksSection = () => {
  const [booksArray, setbooksArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [isClick, setIsClick] = useState(false);

  const [currBook, setCurrBook] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const size = 8;

  const url = import.meta.env.VITE_BACKEND_URL;

  const updateCurrBook = async (id = currBook.book_id) => {
    const data = await getFinalData();
    const updatedBook = data.books.find((b) => b.book_id === id);
    setCurrBook(updatedBook);
  };

  const fetchData = async () => {
    const booksData = await getFinalData();
    setData(booksData.books);
  };

  useEffect(() => {
  }, [booksArray]);

  useEffect(() => {
    fetchData();
  }, [triggerRerender, currBook]);


  useEffect( () => {
    const currBooks = data.slice(index, Math.min(index + size, data.length));
    setbooksArray(currBooks);
  }, [triggerRerender, index, data]);

  const handleSearch = async (e) => {
    const query = e.target.value;

    try {
      const res = await axios.get(
        `${url}/searchBooksByTitle?title=${encodeURIComponent(query)}`
      );

      setbooksArray(res.data);
      setData(res.data);
      setIndex(0);
      if (res.data.length === 0) {
        toast.error("No books found with that title.");
      }
    } catch (err) {
      console.error("Search failed:", err.message);
    }
  };

  return (
    <div>
      <div className="relative top-20 w-full max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
            id="search"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="sm:pt-20 mt-20 sm:mt-5 pt-10 w-screen min-h-screen z-20 flex flex-col sm:flex-wrap sm:flex-row items-center justify-evenly gap-x-2 gap-y-5 hide-scrollbar  p-4 ">
        {isClick && (
          <CurrBook
            setTriggerRerender={setTriggerRerender}
            setCurrBook={setCurrBook}
            currBook={currBook}
            setIsClick={setIsClick}
            isClick={isClick}
            updateCurrBook={updateCurrBook}
          />
        )}

        {booksArray.length > 0 &&
          booksArray.map(
            ({
              book_id,
              title,
              image_url,
              author,
              year,
              availability,
              avgRatings,
              reviews,
            }) => {
              return (
                <div
                  onClick={async () => {
                    setIsClick(true);
                    await updateCurrBook(book_id);
                    // setCurrBook({
                    // book_id,
                    // title,
                    // image_url,
                    // author,
                    // year,
                    // availability,
                    // avgRatings,
                    // reviews,
                    // });
                  }}
                  key={book_id}
                  className="shadow-lg  w-[90%] h-[40%] sm:w-[20%] rounded-md sm:h-[300px] gap-1 flex flex-col  justify-center items-center overflow-hidden  text-black "
                >
                  <div className="w-[70%] h-[12em] aspect-[4/3] flex justify-center ">
                    <img className="" src={image_url} alt="loading"></img>
                  </div>
                  <div className=" flex flex-col w-full h-[80px] sm:h-[100px] justify-start items-start px-2 py-1  overflow-y-auto hide-scrollbar">
                    <div className="flex flex-col  mb-1">
                      <span className="font-semibold">Title :</span>
                      <span className="break-words">{title}</span>
                    </div>
                    <div className="flex flex-col mb-1">
                      <span className="font-semibold">Author :</span>
                      <span className="break-words">{author}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Rating :</span>
                      <span>{avgRatings}</span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        <div className="w-full flex justify-center gap-4 mt-4">
          {index > size - 1 && (
            <button
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              onClick={() => setIndex((prev) => Math.max(0, prev - size))}
            >
              ← Prev
            </button>
          )}
          {index + size < data.length - 1 && (
            <button
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              onClick={() => setIndex((prev) => prev + size)}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksSection;
