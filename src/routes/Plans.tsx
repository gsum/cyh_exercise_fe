import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';


interface Plan {
  id: number;
  name: string;
  steps: { name: string }[];
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/plans`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }

        const data = await response.json();
        setPlans(data?.plans || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const buyPlan = async (planId: number) => {
    if (window.confirm(`Do you want to buy plan with id ${planId}?`)){
        try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/purchase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
          planId: planId
        })
        });

        if (!response.ok) {
          throw new Error('Failed to create purchases');
        }

        navigate("/purchases");

      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
        
    }
  }

  return (
    <div>
      <h2>Plans</h2>
      {plans.length > 0 ? (
        plans.map(({ id, name, steps }) => (
          <div className="plan-card" key={id} style={{
            border: "2px solid white",
            marginBottom: "10px",
            borderRadius: "5px",
            width: "300px"
          }}>
            <h3>{name}</h3>
            <ul>
              {steps.map(({ name }, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
            <button onClick={() => buyPlan(id)}>Buy this plan</button>
          </div>
        ))
      ) : (
        <p>No plans available</p>
      )}
    </div>
  );
};

export default Plans;
