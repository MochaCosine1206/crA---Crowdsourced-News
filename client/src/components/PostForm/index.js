import React from "react";
import "./style.css";

export function Input(props) {
    return (
            <div className="form-group">
            <input className="form-control" {...props} />
            </div>
    );
}

export function FormBtn(props) {
    return (
        <button {...props} style={{ float: "right"}} className="btn btn-success">
          {props.children}
        </button>
    );
}