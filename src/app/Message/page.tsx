import React from 'react'
import MessageChat from '../components/Message';
import BaseLayout from '../components/BaseLayout';


const Message: React.FC = () => {
    return (
        <BaseLayout>
            <MessageChat />
        </BaseLayout>
    );
};

export default Message