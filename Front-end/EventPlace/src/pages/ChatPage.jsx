import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';
import '../styles/componentsStyles/chatRoom/ChatPage.css'
import emptyProfile from '../images/profilePic.svg'
import { GlobalContext } from '../components/utils/GlobalContext';

const ChatPage = () => {
  const { endpoint } = useContext(GlobalContext);
  const { senderId, receiverId, sender } = useParams();
  const [lastMessages, setLastMessages] = useState([])
  const [senderIdState, setSenderIdState] = useState("")
  const [receiverIdState, setReceiverIdState] = useState("")
  const [senderState, setSenderState] = useState("")

  console.log(senderId, receiverId, sender);

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        fetchData();
      }
    };

    const handleDocumentClick = async () => {
      fetchData();
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`http://${endpoint}:8080/initial/findByUser/` + senderId);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setLastMessages(data);
        } else {
          throw new Error('Error al realizar la solicitud');
        }
      } catch (error) {
        console.error(error);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);



  function handleClick(message) {
    console.log(message)
    if (senderId == message.senderName) {
      setSenderIdState(message.senderName)
      setReceiverIdState(message.receiverName)
      setSenderState(message.senderName)
    }
    else {
      setSenderIdState(message.receiverName)
      setReceiverIdState(message.senderName)
      setSenderState(message.receiverName)
    }
    console.log(senderIdState)
    console.log(receiverIdState)
    console.log(senderState)
  }


  return (
    <section className='chatPage'>
      {receiverId === "0" && (!lastMessages || lastMessages.length === 0) ?
        <article className='chatPage_noMessages'>
          You do not have messages!
        </article>
        :
        lastMessages != undefined && lastMessages != null && lastMessages.length > 0 && (
          <article className='chatPage_list_contacts'>
            {lastMessages.map((message) => (
              <article onClick={() => handleClick(message)}>
                {message.otherUserUrlImage == null || message.otherUserUrlImage == '' || message.otherUserUrlImage == undefined
                  ?
                  <img src={emptyProfile} />
                  :
                  <img src={message.otherUserUrlImage} />
                }
                <div className='chatPage_list_contacts_name'>
                  {message.senderName !== sender ? message.senderName.slice(1) : message.receiverName.slice(1)}
                </div>                <div>
                  {message.imageUrl !== undefined && message.imageUrl !== null ? (
                    <div>Image...</div>
                  ) : (
                    message.message
                  )}
                </div>
              </article>
            ))}
          </article>

        )}
      {receiverId != undefined && receiverId != null && (
        <article className='chatPage_chat'>
          {senderIdState !== null && senderIdState !== undefined && senderIdState !== "" ? (
            <ChatRoom username={senderIdState} receiverName={receiverIdState} sender={senderIdState} />
          ) : (
            receiverId == "0" ? (
              <></>
            ) : (
              <ChatRoom username={senderId} receiverName={receiverId} sender={senderId} />
            )
          )}
        </article>
      )}
    </section>

  );
};

export default ChatPage;
