import React, { useEffect } from "react";

import styled from "styled-components";

// import {
//     AzureAD,
//     AuthenticationStatus,
//     withAuthentication,
//     AuthenticationState
// } from "react-aad-msal";

// import { authProvider } from "../authProvider";

// GraphQL
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const GET_PROFILE = gql`
    query {
        getProfile {
            name
        }
    }
`;

function ProfilePage({ staticContext, ...props }) {
    const { data, error, loading } = useQuery(GET_PROFILE, {
        fetchPolicy: "cache-first",
        variables: {}
    });

    useEffect(() => {
        document.title = "Profile / StudentLog";
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (<div {...props}>
        {data.getProfile.name}
    </div>
    );
}

ProfilePage = styled(ProfilePage)`
    color: white;
`

export default ProfilePage;
