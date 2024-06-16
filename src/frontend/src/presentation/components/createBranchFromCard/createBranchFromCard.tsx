import axios from 'axios';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateBranchFromCard: React.FC<{ cardName: string }> = ({ cardName }) => {
  const navigate = useNavigate();

  const handleCreateBranch = async () => {
    try {
      await axios.post('/git', {
        createFeature: cardName
      });
      navigate('/project');
    } catch (error) {
      console.error('Error creating branch:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Create a branch for {cardName}</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateBranch}>
        Create Branch
      </Button>
    </div>
  );
};

export default CreateBranchFromCard;
