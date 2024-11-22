import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Crowdfunding from "../../ethereum/crowdfunding";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CrowdfundingShow extends Component {
  static async getInitialProps(props) {
    const crowdfunding = Crowdfunding(props.query.address);

    const summary = await crowdfunding.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      name: summary[5],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      name : crowdfundingName,
    } = this.props;

    const numApprover = parseInt(approversCount);
    const numMinimumContribution = parseInt(minimumContribution);
    const numRequestsCount = parseInt(requestsCount);

    const items = [
      {
        header: crowdfundingName,
        meta: "Crowdfunding Name",
        description: "Name of this crowdfunding",
        style: { overflowWrap: "break-word" },
      },
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this crowdfunding and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: numMinimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: numRequestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: numApprover,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this crowdfunding",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Crowdfunding Balance (ether)",
        description:
          "The balance is how much money this crowdfunding has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Information about this crowdfunding</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/crowdfundings/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CrowdfundingShow;
