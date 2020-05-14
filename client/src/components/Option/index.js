import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';


const Option = props => {

	//component level states
	const [componentWidth, setComponentWidth] = useState("100%");
	const [componentHeight, setComponentHeight] = useState("100%");

	//destructuring props
	const { 
		optionId,
		backColor, 
		showResults, 
		setShowResults, 
		currentQuestion,
		currQuestionIndex, 
		setCurrQuestionIndex
	} = props;

	let printStatement;
	let vote;

	if (currentQuestion) {
		const { question1, question2, votes1, votes2 } = currentQuestion;
	 	printStatement = (optionId === 1) ? question1 : question2;
	 	vote = (optionId === 1) ? votes1 : votes2;
	} else if (currentQuestion == null){
		printStatement = "You have completed all questions";
	} else {
		printStatement = "Loading...";
	}

	//function to perform animation when any option is clicked
	const clickAnimationHandler = () => {
		setComponentWidth("85%");
		setComponentHeight("85%");
		let backToNormal = setTimeout(() => {
			setComponentWidth("100%");
			setComponentHeight("100%");
			clearTimeout(backToNormal);
		}, 100);
	}

	//main click handler
	const clickHandler = async () => {

		//restrict any process if someone clicks when results are showing
		if (!showResults && currentQuestion) {
			//calling animation performer function
			clickAnimationHandler();
			setShowResults(true);

			const payLoad = {
				optionId,
				id: currentQuestion._id
			};

			if (currentQuestion != null) {
				const updateVote = await axios.post('question/update/vote', { payLoad });
			}
		
			let nextQuestion = setTimeout(() => {
				setShowResults(false);
				setCurrQuestionIndex(c => c + 1);
				clearTimeout(nextQuestion);
			}, 3000);
		}
	
	}

	//some custom styles
	const paraCustomStyle = {
		backgroundColor: '#'+backColor,
		height: componentHeight,
		width: componentWidth
	};

	return (
		<div className="option-container" onClick={clickHandler}>
			<p style={paraCustomStyle}>
				{
					!showResults && <span>{printStatement}</span>
				}
				{
					showResults && <span>{vote} People</span>
				}
			</p>
		</div>
	);
};

export default Option;
