//renders page with information about the company
import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card } from "semantic-ui-react";

class AboutUs extends Component {
    render() {
        return (
        <Layout>
            <h3>About Us</h3>
            <p>
            Gimme Money is a crowdfunding platform that allows users to create
            crowdfundings to raise money for their projects. The platform is built on
            the Ethereum blockchain and uses smart contracts to manage the
            crowdfundings. Realized as a school project, this platform is a proof of concept.
            
            It was created with the purpose of learning about blockchain technology and showing the advantages of using it in a crowdfunding platform.
            </p>
            <Card fluid>
            <Card.Content>
                <Card.Header>Team Members</Card.Header>
                <Card.Description>
                <ul>
                    <li>Lucie ABI CHAAYA</li>
                    <li>Kevin GUYADER</li>
                    <li>Pauline MELIN</li>
                    <li>Luna SCHENK</li>
                </ul>
                </Card.Description>
            </Card.Content>
            </Card>
        </Layout>
        );
    }
    }

export default AboutUs;
