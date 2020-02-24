import React from "react";
import { Link } from "playstation";

export default class GamePreview extends React.Component<Link> {
    render() {
        return <div key={"game-preview-" + this.props.id}></div>;
    }
}
