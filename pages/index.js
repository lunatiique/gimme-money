import React, { Component } from "react";
import Layout from "../components/Layout";
import WaveText from "../components/WaveText";
import BlockGrid from "../components/BlockGrid";
import LatestTransactions from "../components/LatestTransactions";

class Home extends Component {
    render() {
        return (
        <Layout>
            <WaveText text="GIMME MONEY" />
            <h3 style={{ textAlign: "center" }}>Crowdfunding on the blockchain.</h3>
            <BlockGrid />
            <div style={{ marginTop: "40px" }}>
            <LatestTransactions />
            </div>
        </Layout>
        );
    }
    }

export default Home;