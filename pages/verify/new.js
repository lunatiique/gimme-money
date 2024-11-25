import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../../routes";

class NewVerification extends Component {
    state = {
        identifier: "",
        name: "",
        errorMessage: "",
        loading: false,
        result: null
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: "", result: null });
        try {
            const { identifier } = this.state;
            console.log("here")
            // Make GET request to the server
            const response = await axios.get(`http://localhost:5000/verify/${identifier}`);
            this.setState({ result: response.data });
            // Go to validation page
            Router.pushRoute(`/verify/validation?data=${encodeURIComponent(JSON.stringify(response.data))}`);
        } catch (err) {
            if (err.code === "ECONNREFUSED") {
                this.setState({ errorMessage: "Could not connect to the server." });
            } else if (err.response && err.response.status === 404) {
                this.setState({ errorMessage: "Association not found." });
            } else {
                this.setState({ errorMessage: err.message });
            }
        }
        this.setState({ loading: false });
    }



    render() {
        return (
            <Layout>
                <h3 style={{ textAlign: "center" }}>Verify your association :</h3>
                <Form onSubmit={this.onSubmit} style={{ paddingTop: '20px', maxWidth: '400px', margin: '0 auto' }} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Association ID</label>
                        <Input
                            placeholder="Enter your association ID"
                            onChange={(event) => this.setState({ identifier: event.target.value })}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Association Name</label>
                        <Input
                            placeholder="Enter the name of your association"
                            onChange={(event) => this.setState({ name: event.target.value })}
                            required
                        />
                    </Form.Field>
                    <Button primary fluid loading={this.state.loading}>
                        Verify
                    </Button>
                </Form>
                {this.state.errorMessage && (
                    <Message
                        color='red'
                        content={this.state.errorMessage}
                        style={{ marginTop: '20px' }}
                    />
                )}
            </Layout>
        );
    }
}

export default NewVerification;