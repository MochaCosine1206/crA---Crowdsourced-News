import React from "react";
import "./style.css";


export function QuoteText(props) {
    let quoteName;
    let text;
    if(props.name.text !== "but" && props.name.text !== "and"){
        text = <p><i className="fas fa-quote-right"></i><span>  </span>{props.quote}<span>  </span><i className="fas fa-quote-left"></i></p>
        quoteName = <p>-- {props.name.text}</p>
    }
    console.log(props)
    return (
        <div id="QuoteText">
        {text}
        {quoteName}
        </div>
    );
}


export default QuoteText