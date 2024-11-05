import React, { Component } from "react";
import Layout from "../components/Layout";
import WaveText from "../components/WaveText";
import BlockGrid from "../components/BlockGrid";

class Home extends Component {
    render() {
        return (
        <Layout>
            <WaveText text="GIMME MONEY" />
            <h3 style={{ textAlign: "center" }}>Crowdfunding on the blockchain.</h3>
            <BlockGrid />
        </Layout>
        );
    }
    }

export default Home;