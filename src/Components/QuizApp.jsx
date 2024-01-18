import "./QuizApp.css";
import data from "../Assets/data";
import { useRef, useState } from "react";

const QuizApp = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score,setScore] = useState(0)
    let [result,setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let optionArray = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e, answer) => {
        if (lock === false) {
            if (question.ans === answer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1)
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                optionArray[question.ans - 1].current.classList.add("correct");
            }
        }
    };
    const nextQuestion = () => {

        if (index === data.length - 1) {
            setResult(true)
            return 0;
        }
        if (lock === true) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            optionArray.map((option) => {
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
                return null
            })
        }
    };

    const reset = ()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:<>
            <p className="question">
                {index + 1}. {question.question}
            </p>
            <ul>
                <li
                    ref={Option1}
                    onClick={(e) => {
                        checkAnswer(e, 1);
                    }}
                >
                    {question.option1}
                </li>
                <li
                    ref={Option2}
                    onClick={(e) => {
                        checkAnswer(e, 2);
                    }}
                >
                    {question.option2}
                </li>
                <li
                    ref={Option3}
                    onClick={(e) => {
                        checkAnswer(e, 3);
                    }}
                >
                    {question.option3}
                </li>
                <li
                    ref={Option4}
                    onClick={(e) => {
                        checkAnswer(e, 4);
                    }}
                >
                    {question.option4}
                </li>
            </ul>
            <div className="btn-div">
                <button
                    className="btn"
                    onClick={() => {
                        nextQuestion();
                    }}
                >
                    Next
                </button>
            </div>
            <div className="index">{index + 1} of 5 questions</div>
            </>}
            {result?<><h2>You scored {score} out of {data.length}</h2>
            <button className="reset-btn" onClick={()=>{reset()}}>Reset</button></>:<></>}
            
        </div>
    );
};

export default QuizApp;
