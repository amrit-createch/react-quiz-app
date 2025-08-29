import {configureStore} from '@reduxjs/toolkit'
import quizSlice from './quizSlice'
const store = configureStore({
    reducer:{
        quiz:quizSlice
    }
})

export default store