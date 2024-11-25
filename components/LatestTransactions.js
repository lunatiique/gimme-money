import React, { useEffect, useState } from "react";
import axios from "axios";
import { Segment, Header, List, Loader, Message } from "semantic-ui-react";

const LatestTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=1IB71D52KY5E7DPVDHMW4ZDRZDV442IN84`
        );
        const blockNumber = response.data.result;

        const blockResponse = await axios.get(
          `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=1IB71D52KY5E7DPVDHMW4ZDRZDV442IN84`
        );

        setTransactions(blockResponse.data.result.transactions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Segment>
      <Header as="h2" dividing>
        Latest Transactions on Sepolia
      </Header>
      {loading ? (
        <Loader active inline="centered" size="large">
          Loading Transactions...
        </Loader>
      ) : error ? (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      ) : (
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            paddingRight: "1em",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1em",
            backgroundColor: "#f9f9f9",
          }}
        >
          <List divided relaxed>
            {transactions.map((tx) => (
              <List.Item key={tx.hash} style={{ padding: "1em 0" }}>
                <List.Content>
                  <List.Header as="a">Transaction Hash: {tx.hash}</List.Header>
                  <List.Description>
                    <strong>From:</strong> {tx.from} <br />
                    <strong>To:</strong> {tx.to}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </Segment>
  );
};

export default LatestTransactions;
