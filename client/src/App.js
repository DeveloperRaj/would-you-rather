import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Option from './components/Option';

function App() {

  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //app level states
  const [questions, setQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});

  //request server to fetch data from MongoDB
  useEffect(() => {

    //async function to fetch data properly
    const fetchQuestions = async () => {
      const data = await axios.get('question/');
      const mainData = await data.data;
      setQuestions(mainData);
      // console.log(mainData);
    };
    //calling it
    fetchQuestions();

  }, []); //just run it once 

  useEffect(() => {
    if (currQuestionIndex < questions.length) setCurrentQuestion(questions[currQuestionIndex]);
    else setCurrentQuestion(null);

    if (isLoading) setIsLoading(false);
  }, [questions, currQuestionIndex]); //run whenever these states change

  if (isLoading) {
    return(
      <div className="loader">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="App">
        {/*header*/}
        <header>Would you rather...</header>
        
        {/*Option 1*/}
        <Option 
          optionId={1}
          backColor="41337A"
          showResults={showResults}
          setShowResults={setShowResults}
          currQuestionIndex={currQuestionIndex}
          setCurrQuestionIndex={setCurrQuestionIndex}
          currentQuestion={currentQuestion}
        />
        
        {/*Or*/}
        <div className="seprator-container">
          <span>OR</span>
        </div>
        
        {/*Optio 2*/}
        <Option 
          optionId={2}
          backColor="5DB7DE"
          showResults={showResults}
          setShowResults={setShowResults}
          currQuestionIndex={currQuestionIndex}
          setCurrQuestionIndex={setCurrQuestionIndex}
          currentQuestion={currentQuestion}
        />
      </div>
    );
  }

}

export default App;
