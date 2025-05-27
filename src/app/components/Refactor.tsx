"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Container,
  IconButton,
  Radio,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Add, Delete, ContentCopy } from "@mui/icons-material";
import Image from "next/image";
import fox from "../../../public/fox-face.png";
import * as yup from "yup";
import { useForm, useFieldArray, Controller, UseFormSetValue } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Choice {
    
  description: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
}

interface FormData {
  name: string;
  questions: Question[];
}


const schema = yup.object().shape({
  name: yup.string().required("Questionnaire name is required"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required("Question is required"),
        choices: yup
          .array()
          .of(
            yup.object().shape({
              description: yup.string().required("Choice description is required"),
              isCorrect: yup.boolean().required(),
            })
          )
          .min(2, "At least two choices are required")
          .required(),
      })
    )
    .min(1, "At least one question is required")
    .required(),
});

const FormQuestion = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      questions: [
        {
          question: "",
          choices: [
            { description: "", isCorrect: true },
            { description: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const { fields: questions, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Questionnaire saved successfully!");
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 1, width: "100%", display: "flex", alignItems: "center" }}>
        <Image src={fox} alt="Fox face" style={{ width: 24, height: 24, marginRight: "8px" }} />
        <Typography variant="h6" style={{ fontWeight: 600, fontFamily: "Prompt" }}>
          Foxbith Questionnaire
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, mb: 2, width: "100%", display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#FF5C00",
            fontFamily: "Prompt",
            color: "#FF5C00",
            "&:hover": { borderColor: "#FF5C00", backgroundColor: "rgba(255,92,0,0.04)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ width: "180px", height: "48px", borderRadius: 2, fontFamily: "Prompt" }}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Paper>

      <Container sx={{ mb: 5 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 600, fontFamily: "Prompt" }}>
            Questionnaire Detail
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ fontFamily: "Prompt" }}
              />
            )}
          />
        </Paper>

        {questions.map((question, qIndex) => (
          <QuestionField
            key={question.id}
            qIndex={qIndex}
            control={control}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            removeQuestion={removeQuestion}
            appendQuestion={appendQuestion}
            questionsLength={questions.length}
          />
        ))}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Add />}
          onClick={() =>
            appendQuestion({
              question: "",
              choices: [
                { description: "", isCorrect: true },
                { description: "", isCorrect: false },
              ],
            })
          }
          sx={{
            color: "#FF5C00",
            borderColor: "#FF5C00",
            fontFamily: "Prompt",
            "&:hover": { borderColor: "#FF5C00", backgroundColor: "rgba(255,92,0,0.04)" },
          }}
        >
          Add Question
        </Button>
      </Container>
    </>
  );
};


interface QuestionFieldProps {
  qIndex: number;
  control: any;
  errors: any;
  getValues: any;
  setValue: UseFormSetValue<FormData>;
  removeQuestion: (index: number) => void;
  appendQuestion: (value: Question) => void;
  questionsLength: number;
}

const QuestionField: React.FC<QuestionFieldProps> = ({
  qIndex,
  control,
  errors,
  getValues,
  setValue,
  removeQuestion,
  appendQuestion,
  questionsLength,
}) => {
  const { fields: choices, append: appendChoice, remove: removeChoice } = useFieldArray({
    control,
    name: `questions.${qIndex}.choices`,
  });

const [msgChoice, setMsgChoice] = React.useState<string>("");

const handleSetCorrect = (cIndex: number, qIndex: number) => {
  const choices = getValues(`questions.${qIndex}.choices`);
  choices.forEach((_: any, index: number) => {
    setValue(`questions.${qIndex}.choices.${index}.isCorrect`, index === cIndex, { shouldValidate: true, shouldDirty: true });
  });
};

  const handleDuplicateQuestion = () => {
    const question = getValues(`questions.${qIndex}`);
    appendQuestion({
      question: question.question,
      choices: question.choices.map((choice: Choice) => ({ ...choice })),
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" style={{ fontFamily: "Prompt" }}>
        Question {qIndex + 1}
      </Typography>
      <Controller
        name={`questions.${qIndex}.question`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Question"
            required
            sx={{ my: 1, fontFamily: "Prompt" }}
            error={!!errors.questions?.[qIndex]?.question}
            helperText={errors.questions?.[qIndex]?.question?.message}
          />
        )}
      />
      <Typography variant="body2" color="error">
        {errors.questions?.[qIndex]?.choices?.message}
      </Typography>

      {choices.map((choice, cIndex) => (
        <Box key={choice.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Controller
            name={`questions.${qIndex}.choices.${cIndex}.isCorrect`}
            control={control}
            render={({ field }) => (
              <Radio sx={{top:-10}}
          checked={field.value}
          onChange={() => handleSetCorrect(cIndex, qIndex)}
              />
            )}
          />
          <Controller
            name={`questions.${qIndex}.choices.${cIndex}.description`}
            control={control}
            render={({ field }) => {
             
              const errorMsg = errors.questions?.[qIndex]?.choices?.[cIndex]?.description?.message;
              const correctMsg = getValues(`questions.${qIndex}.choices.${cIndex}.isCorrect`) ? "This answer is correct" : "";
              const helperText = errorMsg || correctMsg || " "; 
            
              return (
          <TextField
            {...field}
            label={`Choice ${cIndex + 1}`}
            required
            fullWidth
            error={!!errorMsg}
            helperText={helperText}
            sx={{ fontFamily: "Prompt" }}
            FormHelperTextProps={{ sx: { minHeight: "1.5em" } }}
          />
              );
            }}
          />
          <IconButton sx={{top:-10}}
            onClick={() => removeChoice(cIndex)}
            disabled={choices.length <= 2}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button
        startIcon={<Add />}
        style={{ color: "#FF5C00", fontFamily: "Prompt" }}
        onClick={() => appendChoice({ description: "", isCorrect: false })}
      >
        Add Choice
      </Button>

      <Box mt={1}>
        <Button
          startIcon={<ContentCopy />}
          style={{ color: "black", fontFamily: "Prompt" }}
          onClick={handleDuplicateQuestion}
        >
          Duplicate
        </Button>
        <Button
          startIcon={<Delete />}
          style={{ color: "black", fontFamily: "Prompt" }}
          onClick={() => removeQuestion(qIndex)}
          disabled={questionsLength <= 1}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default FormQuestion;