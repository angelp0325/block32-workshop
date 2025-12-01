import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../api/api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <main>
      <h1>Library Catalog</h1>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.coverimage} alt={book.title} width="150" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/books/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
