import React from 'react';
import './App.css';
import {CommandBar, ICommandBarItemProps} from "office-ui-fabric-react";
import { initializeIcons } from '@uifabric/icons';
import {CommandBarButtonWithMenu} from "./CommandBarButtonWithMenu";

initializeIcons();

function App() {
    return (
        <CommandBar items={getCommandBarItems()} />
    );
}

function getCommandBarItems(): ICommandBarItemProps[] {
    return [
        {
            key: 'go-home-button',
            iconProps: {
                iconName: 'Home'
            },
            text: 'Go home'
        },
        {
            key: 'buy-milk',
            iconProps: {
                iconName: 'Shop'
            },
            text: 'Buy milk'
        },
        {
            key: 'button-1',
            iconProps: {
                iconName: 'Ascending'
            },
            text: 'Random button 1'
        },
        {
            key: 'button-2',
            iconProps: {
                iconName: 'Descending'
            },
            text: 'Random button 2'
        },
        {
            key: 'click-me',
            iconProps: {
                iconName: 'Warning'
            },
            text: 'Click me',
            commandBarButtonAs: CommandBarButtonWithMenu
        }
    ]
}

export default App;
