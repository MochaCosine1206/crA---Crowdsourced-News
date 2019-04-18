import React from "react";
import "./style.css";
import QuoteText from "../QuoteText"


export function PostQuote(props) {
    return (
        <div id="PostQuote">
        {props.quotes.map(quote => (
            <QuoteText
            key={quote.index}
            quote={quote.text}
            name={quote.name}
             />
        ))}
        </div>

    );
}


export default PostQuote