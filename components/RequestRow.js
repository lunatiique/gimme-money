import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Crowdfunding from "../ethereum/crowdfunding";

class RequestRow extends Component {
  onApprove = async () => {
    const crowdfunding = Crowdfunding(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await crowdfunding.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const crowdfunding = Crowdfunding(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await crowdfunding.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = Number(request.approvalCount) > Number(approversCount) / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {Number(request.approvalCount)}/{Number(approversCount)}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
