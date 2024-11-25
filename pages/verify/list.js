import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card } from "semantic-ui-react";
import factory_verifier from "../../ethereum/factory_verifier";
import AssociationVerifier from "../../ethereum/associationVerifier";

class ListAssociation extends Component {

    static async getInitialProps() {
        const associations = await factory_verifier.methods.getAllAssociations().call();
        console.log(associations);
        return { associations };
    }

    renderAssociations() {
        const items = this.props.associations.map((association) => {
            return {
                header: association.titre,
                meta : association.id,
                description: (
                    <div>
                        <p>Address: {association.adr1}</p>
                        <p>Postal Code: {association.adrs_codepostal}</p>
                    </div>
                ),
                fluid: true,
            };
        });

        if (items.length === 0) {
            return (
                <p>
                    No associations found
                </p>
            );
        }

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3 style={{ textAlign: "center" }}>List of verified associations.</h3>
                {this.renderAssociations()}
            </Layout>
        );
    }
}

export default ListAssociation;