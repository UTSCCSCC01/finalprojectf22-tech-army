import styled from "styled-components";

import { ChannelHeader, MessageList, MessageInput } from "stream-chat-react";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    .str-chat-header-livestream {
        width: 100%;
        height: 70px;
    }

    .str-chat_list {
        height: calc(100vh - 70px);
    }

    .str-chat__message-input {
        position: sticky;
        bottom: 20px;
        width: 100%;
    }
`;

export default function ChannelBody() {
    return(
        <Container>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
        </Container>
    );
}