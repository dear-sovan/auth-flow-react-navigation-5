import React, { Component } from "react"
import { View, Text, TouchableOpacity, FlatList, Image, StatusBar } from "react-native"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AuthActions from "../actions/AuthActions"
import * as DashboardActions from "../actions/DashboardActions"

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            userList: [],
            page: 0,
            per_page: 0,
            total: 0,
            total_pages: 0,
            error: ""
        }
    }

    componentDidMount() {
        this.props.actions.getUserList(this.state.page + 1);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.operationalData != null && Object.keys(props.operationalData).length > 0) {
            var operationalData = props.operationalData
            if (operationalData.data.page !== state.page) {
                switch (operationalData.type) {
                    case DashboardActions.FETCH_USERLIST_SUCCESS:
                        var data = operationalData.data;
                        return {
                            userList: [...state.userList, ...data.userList],
                            page: data.page,
                            per_page: data.per_page,
                            total: data.total,
                            total_pages: data.total_pages,
                            isLoading: false
                        }
                        break;
                    case DashboardActions.FETCH_USERLIST_FAILURE:
                        alert("Unable to fetch User List");
                        break;
                }
            }
        }
        return null
    }

    logOut = () => {
        this.props.actions.logOut();
    }

    onEndReached = () => {
        if (this.state.total_pages > this.state.page)
            this.props.actions.getUserList(this.state.page + 1);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <StatusBar barStyle={"dark-content"} />
                <View style={{ height: 60, justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingLeft: 20, paddingRight: 20, borderBottomWidth: .2, borderBottomColor: "#999" }}>
                    <Text style={{ fontSize: 20 }}>Dashboard</Text>
                    <TouchableOpacity onPress={() => this.logOut()} style={{ height: "100%", width: 80, justifyContent: "center", alignItems: "center" }}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: "100%", borderBottomWidth: .5, borderBottomColor: "#999" }} />}
                    data={this.state.userList}
                    renderItem={({ item, index, separators }) => {
                        return (
                            <View key={index} style={{ flexDirection: "row", padding: 20 }}>
                                <Image source={{ uri: item.avatar }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#666" }}>{item.first_name + " " + item.last_name}</Text>
                                    <Text style={{ fontSize: 15, color: "#999" }}>{item.email}</Text>
                                </View>
                            </View>
                        )
                    }}
                    onEndReached={() => this.onEndReached()}
                />

            </View >
        )
    }
}

function mapStateToProps(state) {
    return {
        operationalData: state.DashboardReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, DashboardActions, AuthActions), dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);