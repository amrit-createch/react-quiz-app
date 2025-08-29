import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { loadQuestions } from './redux/quizSlice'
import './App.css'
import { useSelector,useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch ()
  const {questions,status,currentIndex,score} = useSelector(state => state.quiz)
  
  useEffect(()=>{
    dispatch(loadQuestions())
  },[dispatch])
   if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Failed to load questions</p>;
  if (status === "idle" || questions.length === 0) return <p>No questions</p>;
  return (
    <>
     <h2>Score: {score}</h2>
      <h3>{questions[currentIndex].question}</h3>
    </>
  )
}

export default App
