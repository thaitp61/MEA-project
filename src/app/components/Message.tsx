"use client"
import { useEffect, useState } from "react";
import {
    ChannelFilters,
    ChannelOptions,
    ChannelSort,
    StreamChat
} from "stream-chat";
import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
    LoadingIndicator
} from "stream-chat-react";

// import "./styles.css";
import "stream-chat-react/dist/css/index.css";

const API_KEY = "wjtfhg4vcjs8"; //Customers CodeSandbox App

const USER_ID1 = "bob";
const USER_TOKEN1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYm9iIn0.BC4CYfk0buJBnb7ISfT8rzC0o2gqCkAU0YesmSMGiro";

const USER_ID2 = "sara";
const USER_TOKEN2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FyYSJ9._VgX8XJln8Pn8eyA6JdlsjiW_E-DeSZVLDSVZUhFQYQ";

// Setup two users, so that we can simulate send/receive messages using two urls:.
// https://linq62.csb.app/
// https://linq62.csb.app/?alt
const alt = window.location.search === "?alt";

const userId = alt ? USER_ID2 : USER_ID1;
const userToken = alt ? USER_TOKEN2 : USER_TOKEN1;

document.title = `UserId: ${userId} - Stream Chat`;

type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

type StreamChatGenerics = {
    attachmentType: LocalAttachmentType;
    channelType: LocalChannelType;
    commandType: LocalCommandType;
    eventType: LocalEventType;
    messageType: LocalMessageType;
    reactionType: LocalReactionType;
    userType: LocalUserType;
};

const App = () => {
    const [chatClient, setChatClient] = useState<StreamChat | null>(null);

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance<StreamChatGenerics>(API_KEY);

            await client.connectUser(
                {
                    id: userId
                    // image: "https://i.pravatar.cc/150?img=7"
                },
                userToken
            );

            setChatClient(client);
        };

        initChat();
    }, []);

    if (!chatClient) {
        return <LoadingIndicator />;
    }

    const filters: ChannelFilters = {
        type: "messaging",
        members: { $in: [userId] }
    };
    const options: ChannelOptions = { state: true, presence: true, limit: 10 };
    const sort: ChannelSort = { last_message_at: -1, updated_at: -1 };

    return (
        <div>
            <Chat client={chatClient}>
                <ChannelList
                    filters={filters}
                    sort={sort}
                    options={options}
                    showChannelSearch
                />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput focus />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    );
};

export default App;