"use client"
import React from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Radio,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { Add, Delete, ContentCopy } from '@mui/icons-material';
import fox from "../../../public/fox-face.png"
import Image from "next/image"


const handleSubmit = () => {
    console.log("ggggg")
}

const FormQuestion = () => {
  return (
    <>
    <Paper sx={{ p: 2, mb: 2, width: "100%" ,display:"flex"}}>
       <Image src={fox} alt="Fox face" style={{ width: 24, height: 24,marginRight:"8px", }} />
      <Typography variant="h6" gutterBottom style={{fontWeight:600}}>Foxbith Questionnaire</Typography>
      </Paper>
      <Paper sx={{p:2,mb: 2, width: "100%" ,display:"flex",}}>
        <Button variant="outlined">Outlined</Button>
        <Button variant="contained" style={{marginTop:"-10px"}}>Contained</Button>
      </Paper>

    <Container>
    

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom style={{fontWeight:600}}>Questionnaire Detail</Typography>
        <TextField fullWidth label="Name" required />
      </Paper>

      {[1, 2].map((num) => (
        <Paper key={num} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Question {num}</Typography>
          <TextField fullWidth label="Question" required sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Radio checked />
            <TextField label="Description" required fullWidth defaultValue="" />
            <IconButton><Delete /></IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Radio />
            <TextField label="Description" required fullWidth defaultValue="" />
            <IconButton><Delete /></IconButton>
          </Box>

          <Button startIcon={<Add />}>Add Choice</Button>

          <Box mt={1}>
            <Button startIcon={<ContentCopy />}>Duplicate</Button>
            <Button startIcon={<Delete />} color="error">Delete</Button>
          </Box>
        </Paper>
      ))}

      <Button fullWidth variant="outlined" startIcon={<Add />}>Add Question</Button>

      <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
      </Box>
    </Container>
    </>
  );
};

export default FormQuestion;