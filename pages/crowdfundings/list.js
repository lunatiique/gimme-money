import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class CrowdfundingIndex extends Component {
  static async getInitialProps() {
    const crowdfundings = await factory.methods.getDeployedCrowdfundings().call();

    return { crowdfundings };
  }
  renderCrowdfundings() {
    const items = this.props.crowdfundings.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/crowdfundings/${address}`}>
            <a>View Crowdfunding</a>
          </Link>
        ),
        fluid: true,
      };
    });
    if (items.length === 0) {
      return (
        <div>
          <h3>No crowdfundings found</h3>
          <p>
            You can create a new crowdfunding by clicking on the "Create Crowdfunding"
            button
          </p>
        </div>
      );
    }
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Crowdfundings</h3>
          <Link route="/crowdfundings/new">
            <a>
              <Button
                floated="right"
                content="Create Crowdfunding"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCrowdfundings()}
        </div>
      </Layout>
    );
  }
}

export default CrowdfundingIndex;
