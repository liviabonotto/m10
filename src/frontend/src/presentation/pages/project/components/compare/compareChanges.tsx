/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SalesforceService from '../../../../../data/services/salesforce-service'

const CompareChanges: React.FC = () => {
  const [differences, setDifferences] = useState<any>([])
  const [selectedDifferences, setSelectedDifferences] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const getChanges = async () => {
      const response = await SalesforceService.getChanges()
      console.log(response)

      if (response) {
        setDifferences(response)
      }
    }

    void getChanges()
  }, [])

  const handleSelect = (id: string) => {
    setSelectedDifferences(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleCreatePackage = () => {
    const packageDetails = {
      name: `Package ${new Date().toISOString()}`,
      differences: selectedDifferences
    }
    console.log('Package details:', packageDetails)
    axios.post('http://localhost:3094/create-package', packageDetails)
      .then(response => {
        console.log('Package created:', response.data)
        navigate('/project')
      })
      .catch(error => {
        console.error('Error creating package:', error)
      })
  }

  return (
    <div>
      <Typography variant="h4">Compare Changes</Typography>
      {differences.length === 0
        ? (
          <Typography variant="body1">No differences found.</Typography>
        )
        : (
          <List>
            {differences && differences.map((diff: any) => (
              <ListItem key={diff.Id} button onClick={() => { handleSelect(diff.Id) }}>
                <Checkbox checked={selectedDifferences.includes(diff.Id)} />
                <ListItemText primary={diff.Name} secondary={diff.LastModifiedDate} />
              </ListItem>
            ))}
          </List>
        )}
      <Button variant="contained" color="primary" onClick={handleCreatePackage}>
        Create Package
      </Button>
    </div>
  )
}

export default CompareChanges
