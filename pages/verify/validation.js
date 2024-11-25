import React from "react";
import Layout from "../../components/Layout";
import { Card, Button, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory_verifier from "../../ethereum/factory_verifier";

const ValidationPage = () => {
    const router = useRouter();
    const { data } = router.query;
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    // Parse the data received via query parameter
    const association = data ? JSON.parse(data) : null;

    // Add to the blockchain if the user confirms
    const handleAddToBlockchain = async () => {
        try {
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            await factory_verifier.methods
                .addAssociation(association.id, association.titre, association.adr1, association.adrs_codepostal)
                .send({
                    from: accounts[0],
                    gas: "2000000",
                });
            Router.pushRoute("/verify/list");
        } catch (err) {
            setMessage(err.message);
        }
        setLoading(false);
    }


    return (
        <Layout>
            <h3 style={{ textAlign: "center" }}>Association Verification Details</h3>
            {association ? (
                <>
                    <Card centered>
                        <Card.Content>
                            <Card.Header>{association.titre}</Card.Header>
                            <Card.Meta>ID: {association.id}</Card.Meta>
                            <Card.Description>
                                <p>Address: {association.adr1}</p>
                                <p>Postal Code: {association.adrs_codepostal}</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: '20px' }}>
                        <Button primary style={{ marginRight: 80 }} onClick={handleAddToBlockchain} loading={loading}>
                            Yes
                        </Button>
                        <Button primary  loading={loading} onClick={() => Router.push('/')}>
                            Cancel
                        </Button>
                    </div>
                    {message && (
                        <Message error content={message} style={{ marginTop: "20px" }} />
                    )}
                </>
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p>No association data found. Please try again.</p>
                </div>
            )}
        </Layout>
    );
};

export default ValidationPage;
