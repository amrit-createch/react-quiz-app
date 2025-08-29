import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "./quizApi";

export const loadQuestions = createAsyncThunk("quiz/loadQuestions",
    async () => {
        const data = await fetchQuestions();
        return data;
    }
);

const initialState = {
    questions: [],
    currentIndex: 0,
    answers: {},
    score: 0,
    attempts: 0,
    status: "idle",
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        selectAnswer: (state, action) => {
            const { questionIndex, selectedOptionId } = action.payload;
            state.answers[questionIndex] = { selectedOptionId };
        },

        nextQuestion: (state) => {
            const qIndex = state.currentIndex;
            const selected = state.answers[qIndex]?.selectedOptionId
            const correct = state.questions[qIndex]?.correctAnswer;
            if (selected) {
                state.attempts += 1
                if (selected == correct) {
                    state.score += 1
                }
            }
            if (qIndex < state.questions.length - 1) {
                state.currentIndex += 1
            } else {
                state.status = "Quiz finished (you attempted all questions)"
            }
        },
        prevQuestion: (state) => {
            if (state.currentIndex > 0) {
                state.currentIndex -= 1;
            }
        },
        resetQuiz: (state) => {
            state.currentIndex = 0,
                state.answers = {},
                state.score = 0,
                state.attempts = 0,
                state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadQuestions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.status = "ready"
            })
            .addCase(loadQuestions.rejected, (state) => {
                state.status = "error"
            });
    },
})

export const { selectAnswer, nextQuestion, prevQuestion, resetQuiz } =
    quizSlice.actions;
export default quizSlice.reducer;