"use client"
import React,{useState} from 'react';
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
import * as valid from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";


interface Choice {
  description: string;
  isCorrect: boolean;
  
}

interface  Question {
  question: string;
  choices: Choice[];
  msgChoice:string;
}
  

const FormQuestion = () => {
const [name, setName] = useState('');
const [questions, setQuestions] = useState<Question[]>([{
  
  question: '',
  choices: [
    { description: '', isCorrect: true },
    { description: '', isCorrect: false }
  ],
  msgChoice: 'คุณเลือกคำตอบที่ถูกต้องแล้ว'
}]);
const [selectedChoices, setSelectedChoices] = useState<number[]>([ -1 ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        choices: [
          { description: '', isCorrect: true },
          { description: '', isCorrect: false }
        ],
        msgChoice: 'คุณเลือกคำตอบที่ถูกต้องแล้ว'
      }
    ]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (qIndex: number, cIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices[cIndex].description = value;
    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (qIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices.push({ description: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

const handleSetCorrect = (qIndex: number, cIndex: number) => {
  const updatedQuestions = [...questions];
  updatedQuestions[qIndex].choices = updatedQuestions[qIndex].choices.map((choice, idx) => ({
    ...choice,
    isCorrect: idx === cIndex,
  }));
  updatedQuestions[qIndex].msgChoice = 'This answer is correct'; // เปลี่ยนข้อความเป็นภาษาอังกฤษตามที่ต้องการ
  setQuestions(updatedQuestions);
  
  const updatedSelections = [...selectedChoices];
  updatedSelections[qIndex] = cIndex;
  setSelectedChoices(updatedSelections);
};

  const handleDeleteChoice = (qIndex: number, cIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].choices.splice(cIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleDuplicateQuestion = (index: number) => {
    const duplicated = { ...questions[index], choices: [...questions[index].choices.map(choice => ({ ...choice }))] };
    setQuestions([...questions, duplicated]);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    console.log({ name, questions });
  };
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

    <Container maxWidth={false} disableGutters sx={{ mb: 5, width: "100vw !important", px: 2 }}>
  <Paper sx={{ p: 2, mb: 0.1 }}>
    <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>Questionnaire Detail</Typography>
    <TextField
      name="formName"
      fullWidth
      label="Name"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </Paper>

  {questions.map((q, qIndex) => (
    <Paper key={qIndex} sx={{ p: 2, mb: 0.1 }}>
      <Typography variant="h6">Question {qIndex + 1}</Typography>

      <TextField
        fullWidth
        label="Question"
        required
        sx={{ my: 1 }}
        value={q.question}
        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
      />

    {q.choices.map((choice, cIndex) => (
      <Box key={cIndex} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Radio
                    checked={selectedChoices[qIndex] === cIndex}
                    onChange={() => handleSetCorrect(qIndex, cIndex)}
                  />
                  <TextField
                    label={`Description`}
                    required
                    fullWidth
                    value={choice.description}
                    onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                    style={{ borderColor: "black" }}
                  />
                  <IconButton onClick={() => handleDeleteChoice(qIndex, cIndex)} disabled={q.choices.length <= 2}>
                    <Delete />
                  </IconButton>
                </Box>
                {/* แสดงข้อความด้านล่างตัวเลือกที่ถูกเลือกและถูกต้อง */}
                {q.msgChoice && selectedChoices[qIndex] === cIndex && choice.isCorrect && (
                  <Typography variant="body2" color="black" sx={{ ml: 5, mt: 0.5 }}>
                    {q.msgChoice}
                  </Typography>
                )}
              </Box>
    ))}
    {/* แสดงข้อความเฉพาะเมื่อตัวเลือกที่เลือกเป็นคำตอบที่ถูกต้อง */}
 

      <Button startIcon={<Add />} style={{ color: "#FF5C00" }} onClick={() => handleAddChoice(qIndex)}>
        Add Choice
      </Button>
      

      <Box mt={1}>
        <Button startIcon={<ContentCopy />} style={{ color: "black" }} onClick={() => handleDuplicateQuestion(qIndex)}>
          Duplicate
        </Button>
        <Button startIcon={<Delete />} style={{ color: "black" }} onClick={() => handleDeleteQuestion(qIndex)} disabled={questions.length <= 1}>
          Delete
        </Button>
      </Box>
    </Paper>
  ))}
<Paper sx={{p:3}}>
  <Button
    fullWidth
    variant="outlined"
    startIcon={<Add />}
    onClick={handleAddQuestion}
    sx={{
      color: "#FF5C00",
      borderColor: "#FF5C00",
      '&:hover': {
        borderColor: "#FF5C00",
        backgroundColor: "rgba(255,92,0,0.04)"
      }
    }}
  >
    Add Question
  </Button>
</Paper>
</Container>

    </>
  );
};

export default FormQuestion;