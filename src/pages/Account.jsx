import { useEffect, useState, useContext } from "react";
import { getUserProfile, returnBook } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const data = await getUserProfile();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleReturn = async (id) => {
    await returnBook(id);
    fetchProfile();
  };

  if (loading) return <p>Loading account...</p>;

  return (
    <main>
      <h1>
        Welcome, {user.firstname} {user.lastname}
      </h1>
      <p>Email: {user.email}</p>
      <h2>Your Reservations</h2>
      {user.reservations?.length ? (
        <ul>
          {user.reservations.map((r) => (
            <li key={r.id}>
              <img src={r.coverimage} alt={r.title} width="100" />
              <span>
                {r.title} by {r.author}
              </span>
              <button onClick={() => handleReturn(r.id)}>Return</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations yet.</p>
      )}
    </main>
  );
}
