import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';

interface Plan {
  name: string;
  steps: { name: string }[];
}

interface Purchase {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Plan: Plan; 
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/purchases`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }

        const data = await response.json();
        setPurchases(data?.purchases || []);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [token]); // Include token as a dependency for useEffect

  return (
    <div>
      <h2>Purchases</h2>
      {purchases.length > 0 ? (
        purchases.map(({ id, userId, createdAt, updatedAt, Plan }) => (
          <div
            className="plan-card"
            key={id}
            style={{
              border: '2px solid white',
              marginBottom: '10px',
              borderRadius: '5px',
              width: '500px',
            }}
          >
            <h2>Purchase Details</h2>
            <p>Purchase ID: {id}</p>
            <p>User ID: {userId}</p>
            {Plan ? (
              <>
                <p>Plan Name: {Plan.name}</p>
                <p>Plan Steps:</p>
                <ul>
                  {Plan.steps.map((step, index) => (
                    <li key={index}>{step.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No Plan Available</p>
            )}
            <p>Created At: {new Date(createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(updatedAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No plans available</p>
      )}
    </div>
  );
};

export default Purchases;
