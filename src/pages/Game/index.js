/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie'

//component imports
import Sidebar from '../../components/SideBar'
import Card from '../../components/Card'

//data imports
import { allGarbagesObjects } from '../../data/allGarbages'
import { CARDS } from '../../data/allCards'
import { generateArrayAndRandomize } from '../../utils/helpers'

//Lotties imports
import correctAnimationData from '../../assets/clear.json'
import wrongAnimationData from '../../assets/banana-boy.json'
import sucessData from '../../assets/success.json'
import loserData from '../../assets/Animation - 1730793724733.json'
import dancingLoser from '../../assets/Animation - 1730794824389.json'
import natureData from '../../assets/winners.json'

//import style
import './style.css'

function Game() {
    const [showIntro, setShowIntro] = useState(true);
    //setting states
    const [garbageList, setGarbageList] = useState([])
    const [garbage, setGarbage] = useState()
    const [garbageIndex, setGarbageIndex] = useState(0)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [scoreTrue, setScoreTrue] = useState(0)
    const [scoreFalse, setScoreFalse] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [isTrue, setIsTrue] = useState(false)
    const [gameIsRunning, setGameIsRunning] = useState(true)

    //config lottie file
    const defaultOptionsNature = {
        loop: true,
        autoplay: true,
        animationData: natureData,

    };
    //config lottie file
    const defaultOptionsDancing = {
        loop: true,
        autoplay: true,
        animationData: dancingLoser,

    };
    //config lottie file
    const defaultOptionsCorrectAnswer = {
        loop: true,
        autoplay: true,
        animationData: correctAnimationData,

    };
    //config lottie file
    const defaultOptionsWrongAnswer = {
        loop: true,
        autoplay: true,
        animationData: wrongAnimationData,

    };
    //config lottie file
    const defaultOptionsSucessResult = {
        loop: true,
        autoplay: true,
        animationData: sucessData,

    };
    //config lottie file
    const defaultOptionsLosenResult = {
        loop: true,
        autoplay: true,
        animationData: loserData,
    };

    //fetching garbage with random sort
    useEffect(() => {
        setGarbageList(generateArrayAndRandomize(allGarbagesObjects))
        setIsDataLoaded(true)
    }, [])

    //calling selectImageGarbage() if data was loaded
    useEffect(() => {
        selectImageGarbage()
    }, [isDataLoaded])


    // function to set garbage Image and set the actuell index for a next selection
    const selectImageGarbage = () => {

        if (garbageIndex + 1 > garbageList.length - 1) {
            setGarbage(garbageList[0])
            setGarbageIndex(0)
        } else {
            setGarbage(garbageList[garbageIndex])
            setGarbageIndex(garbageIndex + 1)
        }

    }

    // check matchers betwen image and cards, update score ,save results, set states
    const checkAnswer = (category) => {
        if (category === garbage.category) {
            setScoreTrue(scoreTrue + 1)
            setIsTrue(true)
        } else {
            setIsTrue(false)
            setScoreFalse(scoreFalse + 1)
        }
        setShowResult(true)
        setTimeout(() => {
            selectImageGarbage()
            setShowResult(false)
            topFunction()
        }, 2000);
    }

    // go to results
    const endGame = () => {
        setGameIsRunning(false)
        topFunction()
    }

    //scrollTop
    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
// Thêm state `timer`
const [timer, setTimer] = useState(60);

useEffect(() => {
    if (timer > 0) {
        // Giảm dần `timer` mỗi giây
        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(countdown); // Dọn dẹp khi component unmount
    } else {
        // Kết thúc trò chơi khi `timer` bằng 0
        setGameIsRunning(false);
    }
}, [timer]); // Chạy useEffect khi `timer` thay đổi
    //render view
    return (
        <div className="container content-center">
            {gameIsRunning ? <>
                <div className="sidebar">
                        <Sidebar garbage={garbage} score={scoreTrue} onclickHandler={endGame} />
                        {/* Nút đếm ngược thời gian có thể ấn để kết thúc game */}

                        <div className="side-container">
                        <button className="btn-primarycheck" onClick={endGame}>
                            Time left: {timer} seconds
                        </button>
                    </div></div>

                <div className="card-container">
                    {showResult &&
                        <Lottie className="lottieFile" options={isTrue ? defaultOptionsCorrectAnswer : defaultOptionsWrongAnswer}
                            height={"auto"}
                            width={"400px"}
                            isClickToPauseDisabled={true}
                        />}

                    {!showResult &&
                        CARDS.map((card, index) =>
                            <Card key={index} card={card} onclickHandler={checkAnswer} />
                        )
                    }

                </div>
            </>
                : <div className="result-container">
              
                    <div className="result-content">
                        <div className="animation-result">
                            <Lottie className="lottieFile" options={scoreTrue > 10
                                ? defaultOptionsNature
                                : defaultOptionsDancing}
                                height={"auto"}
                                width={"auto"}
                                isClickToPauseDisabled={true}
                            />
                        </div>

                        <div className="result-counters">
                            <h3 className="counter correct-counter">Play Score: {scoreTrue}</h3>
                            <h3 className="counter wrong-counter">Wrong: {scoreFalse}</h3>
                            {scoreTrue > scoreFalse
                                ? <p className="result-text green">Bạn thật là một người yêu môi trường</p>
                                : <p className="result-text red"> Cảm ơn bạn đã tham gia chương trình!</p>

                            }
                            <Lottie className="lottieFile" options={scoreTrue > 10
                                ? defaultOptionsSucessResult
                                : defaultOptionsLosenResult}
                                height={"auto"}
                                width={"250px"}
                                isClickToPauseDisabled={true}
                            />

                        </div>
                    </div>
                    <a className="btn-primary" href="/">Go to home</a>
                </div>
            }
        </div>
    )
}

export default Game
