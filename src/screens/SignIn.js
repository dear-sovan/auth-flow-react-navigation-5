import React, { Component } from "react"
import { View, Text, TouchableOpacity, StatusBar } from "react-native"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AuthActions from "../actions/AuthActions"

class SignIn extends Component {
    constructor(props) {
        super(props)
    }

    signIn = () => {
        this.props.actions.signIn()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                <StatusBar barStyle={"dark-content"} />
                <TouchableOpacity onPress={() => this.signIn()} style={{ padding: 20, borderWidth: .5, borderColor: "#999" }}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")} style={{ padding: 20, borderWidth: .5, borderColor: "#999", marginTop: 20 }}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

function mapStateToProps(state) {
    return {
        operationalData: state.AuthReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);