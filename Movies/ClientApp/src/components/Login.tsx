import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Form, Button, Col, FormLabel, FormGroup, FormControl } from "react-bootstrap";
import * as LoginStore from '../store/LoginStore';


// At runtime, Redux will merge together...
type LoginProps =
    LoginStore.ILoginState // ... state we've requested from the Redux store
    & typeof LoginStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ page: string }>; // ... plus incoming routing parameters

interface LoginState {
    email: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    UNSAFE_componentWillMount() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('movieList');
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password, () => {
            this.props.history.push("/movielist");
        });
    }

    public render() {
        return (
            <div className="login" >
                <Col sm={6} md={6} lg={6}>
                    <div className="user">
                        <i className="fas fa-user-circle fa-5x user-icon"></i>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={(e: any) => this.setState({ email: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={(e: any) => this.setState({ password: e.target.value })}
                            />
                        </FormGroup>
                        <Button size="lg" type="submit" disabled={!this.validateForm()}>
                            <i className="fas fa-sign-in-alt sign-in"></i> Login
                    </Button>
                    </Form>
                </Col>
            </div>
        );
    }
}

export default connect(
    null, // Selects which state properties are merged into the component's props
    LoginStore.actionCreators // Selects which action creators are merged into the component's props
)(Login as any);