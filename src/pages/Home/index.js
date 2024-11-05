import React from 'react'
import Lottie from 'react-lottie'
import MainImage from '../../assets/flyer/rac.jpg';

//import data
import { Flyers } from '../../data/flyer'

//import Lottie
import ecoletaData from '../../assets/ecoleta.json'

import './styles.css'

function Home() {

    //config lottie
    const defaultOptionsEcoleta = {
        loop: true,
        autoplay: true,
        animationData: ecoletaData,

    };

    //render view
    return (
        <>
            <div className="container">
                <div className="content">
                  
                

                    <p className="description">
                    "Bạn có biết cách phân loại rác để tái chế không? Nếu bạn biết rồi thì chúc mừng nhé!
Nếu chưa, hãy cùng tìm hiểu ! Đọc kiến thức dưới đây để học và thử xem bạn biết được bao nhiêu!"
                    </p>
                    <div className="flyer-container">
                    <img src={MainImage} alt="header flyer" />
                        </div>
                    <a className="btn-primary" href="/game">Play Game</a>
                </div>
            </div >
        </>
    )
}

export default Home
