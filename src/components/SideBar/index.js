import React from 'react'

import './style.css'

//component Sidebar render image and a score, use a props for onclick function and set a score
function SideBar({ garbage, score, onclickHandler }) {

    return (
        <div className="side-container">
            <p className="description">
            Phân loại chính xác cho loại rác này:
            </p>
            <img src={garbage?.image} alt="Trash" className="random-image" />
            <h3 className="score"> Score: {`${score}`}</h3>
        
        </div>
    )
}

export default SideBar
