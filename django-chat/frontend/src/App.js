import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as authActions from './store/actions/auth';
import * as navActions from './store/actions/nav';
import * as messageActions from './store/actions/message';
import BaseRouter from './routes';
import Sidepanel from './containers/Sidepanel';
import Profile from './containers/Profile';
import AddChatModal from './containers/Popup';
import WebSocketInstance from './websocket';

class App extends React.Component {

    constructor(props) {
        super(props);
        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
        );
    }

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <Router>
                <div id="frame">
                    <Sidepanel />
                    <div className="content">
                        <AddChatModal
                            isVisible={this.props.showAddChatPopup}
                            close={() => this.props.closeAddChatPopup()}
                        />
                        <Profile />
                        <BaseRouter />
                    </div>
                </div>
            </Router>
        );
    };
}

const mapStateToProps = state => {
    return {
        showAddChatPopup: state.nav.showAddChatPopup,
        authenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authActions.authCheckState()),
        closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
        addMessage: message => dispatch(messageActions.addMessage(message)),
        setMessages: messages => dispatch(messageActions.setMessages(messages))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);