import React, { useEffect, useState } from 'react';
import DashHeader from '../components/DashHeader';
import { AddFriend } from '../components/Dashboard/AddFriends';
import Middle from '../components/Dashboard/MiddleDashboard';
import { instance } from '../utils/AxiosConfig';
import { userActionCreator } from "../redux/actionCreator/userAction";
import { store } from "../redux/store"
import Friend from '../components/Dashboard/popups/Friend';
import "../styles/Dashboard.css"
import AddExpense from '../components/Dashboard/popups/addExpense';
import SettleUp from '../components/Dashboard/popups/settleUp';

export const Dashboard = (props)=> {
    const [showFriend, setShowFriend] = useState(false);
    const [showExp, setShowExp] = useState(false);
    const [settleUp, setSettleUp] = useState(false);

    useEffect(() => {
        console.log("userName: ", localStorage.username);
        instance.post('/getData', { username: localStorage.username }).then((resp) => {
            console.log("this is response", resp.data.user);
            var action = userActionCreator(resp.data.user, 'AddUser');
            store.dispatch(action);
        })
    }, []);

    function handleShowFriend() {
        setShowFriend(!showFriend);
    }

    function handleShowExpense() {
        setShowExp(!showExp);
    }

    function handleSettle() {
        setSettleUp(!settleUp);
    }

    return (
        <div >
            <DashHeader />

            {showFriend && <Friend friend={handleShowFriend} />}
            {showExp && <AddExpense friend={handleShowExpense} />}
            {settleUp && <SettleUp friend={handleSettle} />}

            <div className="flex">
                <AddFriend friend={handleShowFriend} />
                <Middle friend={handleShowExpense} settle={handleSettle} />
            </div>
        </div>
    )
}
