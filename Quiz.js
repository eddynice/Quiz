import React, { Component } from 'react'
import {QuizData} from './QuizData';
export default class Quiz extends Component {
    state = {
        userAnswer:null,
        currentQuestion:0,
        options:[],
        quizEnd:false , 
        score: 1,
        disabled:true,
        previous:false
       


    }
    loadQuiz = () =>{
        const {currentQuestion} = this.state;
         this.setState(() =>{
             return{
                 questions: QuizData[currentQuestion].question,                 
                 options: QuizData[currentQuestion].options,
                 answer: QuizData[currentQuestion].answer
             }
             
         })
         console.log(this.loadQuiz)
    }
    
    componentDidMount(){
        this.loadQuiz();

    }
        nextQuestion = () =>{
    const {userAnswer, answers, score}  = this.state;
    this.setState({
        currentQuestion:this.state.currentQuestion +1
    })
    console.log(this.state.currentQuestion)

   
   
    //increase the score if answer is correct 
    if(userAnswer === answers){
        this.setState({
         score:score +1   
       
        })
        
    }  


    
}
back = () =>{
    this.setState({
        currentQuestion:this.state.currentQuestion -1
    })
    console.log(this.state.currentQuestion)
}


// update compoenent
componentDidUpdate(prevProps,prevState){
    const {currentQuestion} = this.state;
    if(this.state.currentQuestion !== prevState.currentQuestion){
        this.setState(()=>{
            return{
              disabled:true,
                questions:QuizData[currentQuestion].question,
                options:QuizData[currentQuestion].options,
                answers:QuizData[currentQuestion].answer
            }
        })
    }
}
//check Answer
checkAnswer =  (answer) =>{
    this.setState({
        userAnswer:answer,
        disabled:false


    })
}
finishHandle =() =>{
    if(this.state.currentQuestion === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    } 

}

    render() {
        const {questions, options, currentQuestion , userAnswer, quizEnd} = this.state;
        if(quizEnd){
            return(
                <div>
                    <h2>GAME OVER  <b>final score is {this.state.score} point</b> </h2>
                    <p>The Correct Answer's for the Questions was </p>
                    <ul>
                        {QuizData.map((Item, index)=>(
                        <li className="ui floating message options"
                        key={index}>
                            {Item.answer}
                        </li>
                        ))}
                    </ul>
                </div>
            )
        }
        return (
            <div className="App">
               <h1>{questions} </h1><br></br>
               <span> {`Questions ${currentQuestion} out of ${QuizData.length -1}`} </span><br></br>
               {options.map(option =>(
                   <p key={ Option.id} 
                   
                   className={`Ui Floating message options
                   ${userAnswer === option ? "selected" :null}
                   `}
                   onClick={() =>this.checkAnswer(option)}
                   >
                       {option}
                   </p>
               ))}

               {currentQuestion >  Quiz.length &&
               <button
               className="ui inverted button  btn btn-outline-light my-2 my-sm-0"
               disabled={this.state.previous}
               onClick={this.back}>Previous</button>
              
               }
               {currentQuestion < QuizData.length  -1 && 
               <button
               className="ui inverted button  btn btn-outline-light my-2 my-sm-0"
               disabled={this.state.disabled}
               onClick={this.nextQuestion}
               
               >NEXT</button>
    }
               {currentQuestion === QuizData.length -1 &&
               <button
               disabled={this.state.disabled}
               className="ui inverted button  btn btn-outline-light my-2 my-sm-0"
               onClick={this.finishHandle}>FINISH</button>
               }
            
            
            </div>
        )
    }
}
