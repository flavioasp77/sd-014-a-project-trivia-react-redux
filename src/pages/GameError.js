// import React, { Component } from 'react';
// import md5 from 'crypto-js/md5';
// import Loading from '../components/Loading';
// import Header from '../components/Header';
// import { getQuestions } from '../services/requests';

// import '../css/Game.css';

// const correctAnswer = 'correct-answer';

// class Game extends Component {
//   constructor() {
//     super();
//     this.state = {
//       questionsList: [],
//       currentIndex: 0,
//       currentQuestion: [],
//       seconds: 30,
//       disabled: false,
//     };
//     this.setQuestionsInState = this.setQuestionsInState.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.resetSeconds = this.resetSeconds.bind(this);
//   }

//   // Caso a pergunta não seja respondida a tempo, a resposta é considerada como errada
//   // Respostas incorretas não somam pontos ao placar

//   componentDidMount() {
//     const ONE_SECOND = 1000;
//     this.cronometerInterval = setInterval(() => {
//       this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
//     }, ONE_SECOND);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const MIN_SECONDS = 0;
//     if (prevState.seconds === MIN_SECONDS) {
//       this.resetSeconds();
//     }
//   }

//   async setQuestionsInState() {
//     const { currentIndex } = this.state;
//     const { results } = await getQuestions();
//     const currentQuestion = results[currentIndex];
//     const answers = this.treatAnswersData(currentQuestion);
//     this.setState({
//       questionsList: results,
//       currentQuestion,
//       answers,
//     });
//   }

//   resetSeconds() {
//     this.setState({
//       seconds: 0,
//       disabled: true,
//     });
//   }

//   shuffle(array) {
//     return array.map((value) => ({ value, sort: Math.random() }))
//       .sort((a, b) => a.sort - b.sort)
//       .map(({ value }) => value);
//   }

//   treatAnswersData(questionInfo) {
//     const CORRECT_ANSWER = {
//       value: correctAnswer, alternative: questionInfo.correct_answer,
//     };
//     const WRONG_ANSWERS = questionInfo.incorrect_answers.map((alternative, index) => ({
//       value: `wrong-answer-${index}`,
//       alternative,
//     }));
//     const ALL_ANSWERS = [{ ...CORRECT_ANSWER }, ...WRONG_ANSWERS];
//     const SHUFFLED_ANSWERS = this.shuffle(ALL_ANSWERS);
//     return SHUFFLED_ANSWERS;
//   }

//   handleClick({ target }) {
//     target.parentElement.className = 'answers-reveal';
//     this.setState({
//       disabled: true,
//     });
//   }

//   render() {
//     const { answers, currentQuestion, questionsList, disabled, seconds } = this.state;
//     const { player } = JSON.parse(localStorage.getItem('state'));
//     const userHash = md5(player.gravatarEmail).toString();

//     if (questionsList.length < 1) {
//       this.setQuestionsInState();
//       return (<Loading />);
//     }
//     return (
//       <>
//         <Header player={ player.name } score="0" src={ `https://www.gravatar.com/avatar/${userHash}` } />
//         <main className="game__container">
//           <div>
//             <h4 data-testid="question-category">{currentQuestion.category}</h4>
//             <p data-testid="question-text">{currentQuestion.question}</p>
//             {
//               answers.map(({ value, alternative }, index) => (
//                 <button
//                   type="button"
//                   key={ index }
//                   data-testid={ value }
//                   onClick={ this.handleClick }
//                   disabled={ disabled }
//                 >
//                   {alternative}
//                 </button>
//               ))
//             }
//             <p>
//               Tempo restante:
//               { seconds }
//             </p>
//           </div>
//         </main>
//       </>
//     );
//   }
// }

// export default Game;
