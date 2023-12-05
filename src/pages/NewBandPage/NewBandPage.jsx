import React from 'react';
import NewBandForm from "../../components/NewBandForm/NewBandForm";

export default function NewOrderPage() {
  const handleCreateBand = (newBand) => {
    // Handle the creation of a new band, if needed
    console.log('New Band created:', newBand);
  };

  return (
    <>
      <h1>NewBandPage</h1>
      <NewBandForm onCreateBand={handleCreateBand} />
    </>
  );
}