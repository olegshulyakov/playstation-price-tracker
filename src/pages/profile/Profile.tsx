import { Container } from "@material-ui/core";
import React from "react";
import Navbar from "../../components/Navbar";
import AppRoutes from "../../routes/AppRoutes";

const Profile: React.FC = () => {
    return (
        <>
            <Navbar />
            <Container>
                <AppRoutes path="/profile" />
            </Container>
        </>
    );
};

export default Profile;
