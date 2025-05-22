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
     <Paper sx={{ p: 2, mb: 1, width: "100%" ,display:"flex"}}>
           <Image src={fox} alt="Fox face" style={{ width: 24, height: 24,marginRight:"8px", }} />
          <Typography variant="h6" gutterBottom style={{fontWeight:600}}>Foxbith Questionnaire</Typography>
          </Paper>
          <Paper sx={{p:2,mb: 2, width: "100%" ,display:"flex",justifyContent:"flex-end",gap:2}}>
            <Button variant="outlined" sx={{  borderColor: "#FF5C00",
                  fontFamily: "Prompt",
                  color: "#FF5C00"}}>Cancel</Button>
            <Button
                variant="contained"
                color="warning"
                sx={{
                  width: "180px",
                  height: "48px",
                  borderRadius: 2,
                  fontFamily: "Prompt",
    
                }}
              >
                Save
              </Button>
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

          <Button startIcon={<Add />} style={{ color: "#FF5C00" }}>Add Choice</Button>

          <Box mt={1}>
            <Button startIcon={<ContentCopy />} style={{ color: "black" }} >Duplicate</Button>
            <Button startIcon={<Delete />} style={{ color: "black" }}>Delete</Button>
          </Box>
        </Paper>
      ))}

      <Button fullWidth variant="outlined" startIcon={<Add />} sx={{
      color: "#FF5C00",
      borderColor: "#FF5C00",
      '&:hover': {
        borderColor: "#FF5C00",
        backgroundColor: "rgba(255,92,0,0.04)"
      }
    }}>Add Question</Button>

    
    </Container>
    </>
  );
};

export default FormQuestion;