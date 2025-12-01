import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBookById, reserveBook } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleReserve = async () => {
    try {
      await reserveBook(book.id);
      setMessage("Book reserved successfully!");
    } catch {
      setMessage("Failed to reserve book.");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <main>
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} width="200" />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>{book.description}</p>

      {token ? (
        <button onClick={handleReserve} disabled={!book.available}>
          {book.available ? "Reserve" : "Not Available"}
        </button>
      ) : (
        <p>Login to reserve this book.</p>
      )}
      {message && <p>{message}</p>}
    </main>
  );
}
