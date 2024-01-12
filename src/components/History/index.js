import React from 'react';
import { HistoryContainer, HistoryTitle, HistoryList, HistoryItem, NoHistoryText } from './styles';


function History({ history, clearHistory }) {
  return (
    <HistoryContainer>
      <HistoryTitle>Calculation History</HistoryTitle>
      {history.length > 0 ? (
        <>
          <HistoryList>
            {history.map((item, index) => (
            <HistoryItem key={index}>{item}</HistoryItem>
          ))}
          </HistoryList>
          <button onClick={clearHistory}>Clear History</button>
        </>
      ) : (
        <NoHistoryText>No calculations yet.</NoHistoryText>
      )}
    </HistoryContainer>
    
  );
}

export default History;