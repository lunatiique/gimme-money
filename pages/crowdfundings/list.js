import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Crowdfunding from "../../ethereum/crowdfunding";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class CrowdfundingIndex extends Component {

  static async getInitialProps() {
    const crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
  
    // Use Promise.all to handle all asynchronous calls
    const information_about_crowdfundings = await Promise.all(
      crowdfundings.map(async (address) => {
        const crowdfunding = Crowdfunding(address);
        const summary = await crowdfunding.methods.getSummary().call();
        return {
          address,
          minimumContribution: summary[0],
          balance: summary[1],
          requestsCount: summary[2],
          approversCount: summary[3],
          manager: summary[4],
          name: summary[5],
        };
      })
    );
      return { information_about_crowdfundings };
  }

  renderCrowdfundings() {
  
    const items = this.props.information_about_crowdfundings.map((info) => {
      return {
        header: info.name,
        description: (
          <Link route={`/crowdfundings/${info.address}`}>
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
            button.
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
