import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <ul>
        <li>Ensure that the CSV data is properly formatted</li>
        <li>Each column should be separated by a comma</li>
        <li>Column names should match the metric's column names exactly</li>
        <li>Data types should be consistent with the metric's column types</li>
        <li>Do not leave any required fields empty</li>
        <li>Do not leave spaces between columns</li>
        <li>Timestamp format must be text string such as <br />2007-12-03T10:15:30.00Z</li>
      </ul>
    </div>
  );
};

export default Instructions;