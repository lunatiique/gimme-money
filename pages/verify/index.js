import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button } from "semantic-ui-react";
import { Link } from "../../routes";

class IndexVerification extends Component {
    render() {
        return (
            <Layout>
                <h3 style={{ textAlign: "center" }}>Verify your association on the blockchain.</h3>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: '20px' }}>
                    <Link route={`/verify/new`}>
                        <Button primary style={{ marginRight: 80 }}>
                            Verify your association
                        </Button>
                    </Link>
                    <Link route={`/verify/list`}>
                        <Button primary>
                            See Verified Associations
                        </Button>
                    </Link>
                </div>
            </Layout>
        );
    }
}

export default IndexVerification;