import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  return (
    <main>
      <h1>Book Details</h1>
      <p>Details for book ID: {id}</p>
    </main>
  );
}
