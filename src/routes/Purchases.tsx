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
  Plan: Plan | null; 
}

const PurchaseCard: React.FC<{ purchase: Purchase }> = ({ purchase }) => (
  <div
    className="plan-card"
    key={purchase.id}
    style={{
      border: '2px solid white',
      marginBottom: '10px',
      borderRadius: '5px',
      width: '500px',
    }}
  >
    <h2>Purchase Details</h2>
    <p>Purchase ID: {purchase.id}</p>
    <p>User ID: {purchase.userId}</p>
    {purchase.Plan ? (
      <>
        <p>Plan Name: {purchase.Plan.name}</p>
        <p>Plan Steps:</p>
        <ul>
          {purchase.Plan.steps.map((step, index) => (
            <li key={index}>{step.name}</li>
          ))}
        </ul>
      </>
    ) : (
      <p>No Plan Available</p>
    )}
    <p>Created At: {new Date(purchase.createdAt).toLocaleString()}</p>
    <p>Updated At: {new Date(purchase.updatedAt).toLocaleString()}</p>
  </div>
);

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
  }, [token]); 

  return (
    <div>
      <h2>Purchases</h2>
      {purchases.length > 0 ? (
        purchases.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase} />)
      ) : (
        <p>No plans available</p>
      )}
    </div>
  );
};

export default Purchases;
