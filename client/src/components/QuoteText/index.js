import React from "react";
import "./style.css";


export function QuoteText(props) {
    console.log(props)
    return (
        <div id="QuoteText">
        <p><i class="fas fa-quote-right"></i><span>  </span>{props.quote}<span>  </span><i class="fas fa-quote-left"></i></p>
        <p>-- {props.name.text}</p>
        </div>
    );
}


export default QuoteText