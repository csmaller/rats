import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeader from "../components/pageHeader";
import ReactGA from 'react-ga';
import { Form, Button } from "react-bootstrap";
import Honeypot from "../components/honeypot";

ReactGA.initialize(process.env.GOOGLE_ID);

export default function Contact(props) {
    const siteTitle = "RATS Band Contact page";
    const [data, setData] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        if (typeof "window" !== "undefined") {
          ReactGA.pageview(window.location.pathname + window.location.search);
        }
      }, []);

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleSubmit = e => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "ratsContactForm", ...data })
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    };

    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });
    const { name, email, message } = data;
    return (
        <Layout location={props.location} title={siteTitle}>
            <SEO
                title="Contact"
                keywords={[`rage against the supremes`, `park city music`, `utah wedding bands`, `salt lake city bands`]}
            />
            <Honeypot/>
            <PageHeader title="Contact Us" />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <Form name="ratsContactForm" onSubmit={handleSubmit} data-netlify="true" >
                        <input type="hidden" name="form-name" value="ratsContactForm" />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="enter your name" type="text" value={name} onChange={handleChange} name="name" />

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} name="message" value={message} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
