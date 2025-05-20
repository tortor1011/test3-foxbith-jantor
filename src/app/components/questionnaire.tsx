"use client"
import React, { useState } from 'react';
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

interface Choice {
  description: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
}

const QuestionnaireForm = () => {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{
    question: '',
    choices: [
      { description: '', isCorrect: true },
      { description: '', isCorrect: false }
    ]
  }]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        choices: [
          { description: '', isCorrect: true },
          { description: '', isCorrect: false }
        ]
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
      isCorrect: idx === cIndex
    }));
    setQuestions(updatedQuestions);
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
    <Container>
      <Typography variant="h5" gutterBottom>Foxbith Questionnaire</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </Paper>
      {questions.map((q, qIndex) => (
        <Paper key={qIndex} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Question {qIndex + 1}</Typography>
          <TextField fullWidth label="Question" value={q.question} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} required sx={{ my: 1 }} />
          {q.choices.map((choice, cIndex) => (
            <Box key={cIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Radio
                checked={choice.isCorrect}
                onChange={() => handleSetCorrect(qIndex, cIndex)}
              />
              <TextField
                label="Description"
                value={choice.description}
                onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                required
                fullWidth
              />
              <IconButton onClick={() => handleDeleteChoice(qIndex, cIndex)}><Delete /></IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={() => handleAddChoice(qIndex)}>Add Choice</Button>
          <Box mt={1}>
            <Button startIcon={<ContentCopy />} onClick={() => handleDuplicateQuestion(qIndex)}>Duplicate</Button>
            <Button startIcon={<Delete />} color="error" onClick={() => handleDeleteQuestion(qIndex)}>Delete</Button>
          </Box>
        </Paper>
      ))}
      <Button fullWidth variant="outlined" startIcon={<Add />} onClick={handleAddQuestion}>Add Question</Button>
      <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
      </Box>
    </Container>
  );
};

export default QuestionnaireForm;