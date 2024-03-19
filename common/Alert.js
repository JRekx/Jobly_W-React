/**
 * Alert component displays alert messages.
 * @param {{ type: string, messages: string[] }} props - Component props.
 * @param {string} props.type - Type of alert (danger, warning, etc). Default 'danger'.
 * @param {string[]} props.messages - Array of alert messages to display.
 */
import React from "react";

function Alert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default Alert;
