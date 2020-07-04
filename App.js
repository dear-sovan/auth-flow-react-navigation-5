import React from "react";
import { View } from "react-native"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AuthActions from "./src/actions/AuthActions"
import AuthStack from './src/routes/AuthStack';
import UserStack from './src/routes/UserStack';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }

  }

  componentDidMount() {
    this.props.actions.getLoginStatus()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.operationalData !== "" && props.operationalData.isLoggedIn !== undefined) {
      return {
        isLoggedIn: props.operationalData.isLoggedIn,
        isLoading: false
      }
    }
    return null
  }

  render() {
    let { isLoading, isLoggedIn } = this.state
    var content = "";
    if (isLoading)
      content = <View />
    else
      content = isLoggedIn ? <UserStack /> : <AuthStack />

    return content
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
)(App);
