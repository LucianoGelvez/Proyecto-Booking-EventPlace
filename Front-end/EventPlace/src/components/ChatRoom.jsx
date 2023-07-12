import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import close from '../images/close.svg'
import background from '../images/Logo.png'
import '../styles/componentsStyles/chatRoom/ChatRoom.css'
import { GlobalContext } from './utils/GlobalContext';

var stompClient = null;

const ChatRoom = ({ username, receiverName, sender }) => {
  const { endpoint } = useContext(GlobalContext);
  const [Chats, setChats] = useState([]);
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const imageRef = useRef(null);
  const [userData, setUserData] = useState({
    username: username,
    receivername: receiverName,
    message: ''
  });

  const handleDocumentClick = (event) => {
    if (
      imageRef.current &&
      !imageRef.current.contains(event.target) 
    ) {
      setShowImage(false);
      setSelectedImage(null)
    }



  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    console.log(receiverName)
    setChats([])
    fetch(`http://${endpoint}:8080/initial/${username}/${receiverName}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setChats(prevChats => [...prevChats, ...data]);
        } else {
          console.error('data is not iterable');
        }
      })
      .catch(error => console.error(error));

    console.log(username)
    console.log(receiverName)
    console.log(sender)

    let Sock = new SockJS(`http://${endpoint}:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

  }, [username, receiverName, sender]);

  const handleImage = (event) => {
    setMessage("")
    setUserData({ ...userData, message: '' });
    const file = event.target.files[0];
    setSelectedImage(file);
    setShowImage(true);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  useLayoutEffect(() => {
    const messagesContainer = messagesEndRef.current;
    setTimeout(() => {
      messagesContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 70)

    console.log(Chats);
  }, [Chats]);


  const onConnected = () => {
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = useCallback((payload) => {
    let payloadData = JSON.parse(payload.body);
    if (payload != undefined) {
      let chatMessage = {
        senderName: payloadData.senderName,
        receiverName: payloadData.receivername,
        message: payloadData.message,
        status: payloadData.status,
        imageUrl: payloadData.imageUrl
      };
      console.log(payload.body)

      if (payloadData.status === "MESSAGE") {
        setChats((prevChats) => [...prevChats, chatMessage]);
      }
    }
  }, []);

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setMessage(value)
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    console.log(userData.message)
    let chatMessage = {
      senderName: userData.username,
      receiverName: userData.receivername,
      message: userData.message,
      status: "MESSAGE"
    };
    console.log(selectedImage)

    if (selectedImage != null) {
      console.log(selectedImage == null)
      const formData = new FormData();
      formData.append('file', selectedImage);

      fetch(`http://${endpoint}:8080/images`, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            console.log('Error en la solicitud:', response.status);
            throw new Error('Error en la solicitud');
          }
        })
        .then(data => {
          console.log(data);
          chatMessage = {
            senderName: userData.username,
            receiverName: userData.receivername,
            message: userData.message,
            status: "MESSAGE",
            imageUrl: data
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
          setChats([...Chats, chatMessage]);
          setMessage("")
          setUserData({ ...userData, message: "" });

        })
        .catch(error => {
          console.error(error);
        });

    }
    else {
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setChats([...Chats, chatMessage]);
      setMessage("")
      setUserData({ ...userData, message: "" });
    }
    removeImage()
  };


  const removeImage = () => {
    setSelectedImage(null);
    setShowImage(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendValue();
    }
  };


  return (
    <div className='chatRoom chatScroll' >
      <img className='chatRoom_logo' src={background} alt="" />
      <div className='chatRoom_message_container'>
        {Chats.map((chat, index) => {
          if ((chat.message != null || chat.imageUrl != null) && chat.senderName.includes(sender)) {
            return (
              <div key={index} className="message-container-orange">
                {console.log(chat)}
                <div className="message-user-name" >You</div>
                {chat.imageUrl !== null && chat.imageUrl != undefined && chat.message == '' || chat.message == null ? <img src={chat.imageUrl} alt="Selected Image" style={{ width: "100%", position: "relative", top: "1vh" }} /> : chat.message}
              </div>
            );
          } else if((chat.message != null || chat.imageUrl != null) && !chat.senderName.includes(sender)) {
            return (
              <div key={index} style={{ backgroundColor: "#F2F2F7", borderRadius: "8px", margin: "10px", padding: "10px", height: "auto", wordWrap: "break-word", width: "auto", maxWidth: "30%", color: "black" }}>
                <div style={{ backgroundColor: "#292a2b", width: "8vw", textAlign: "center", borderRadius: "15px", color: "white" }}>
                  {chat.senderName !== sender && chat.senderName}
                </div>
                {console.log(chat.url)}
                {chat.imageUrl !== null && chat.imageUrl !== undefined && (chat.message === '' || chat.message === null) ? (<><img src={chat.imageUrl} alt="Selected Image" style={{ width: "100%", position: "relative", top: "1vh" }} /></>) : (<><div>{chat.message}</div></>)}
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      {showImage && (
        <div style={{ position: "relative", bottom: "10vh" }}>
          <div style={{ backgroundColor: "white", width: "4vw", zIndex: "30", position: "absolute", top: "7.5vw", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "2vw", height: "8vh", left: "32vw" }}>
            <img src={close} style={{ width: "3vw", position: "relative", zIndex: "20", cursor: "pointer" }} onClick={removeImage} />
          </div>
          <img ref={imageRef} src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: "35vw", position: "absolute", top: "15vh", left: "2vw", borderRadius: "1vw", maxHeight:"65vh" }} />
        </div>
      )}

      <div ref={formRef} className="myForm" >
        <input onKeyDown={handleKeyPress} className="messageInput" onChange={handleMessage} value={message} type="text" placeholder='Type something...' />
        <input type="file" onChange={handleImage} style={{ display: "none" }} ref={fileInputRef} />
        <button className="chatButtonImg" type="button" onClick={openFileInput}><img src="https://img.icons8.com/3d-fluency/94/camera.png" alt="camera" />
        </button>

        <button className="chatButtonImg" type="button" onClick={sendValue}><img src="https://img.icons8.com/3d-fluency/94/paper-plane.png" alt="paper-plane" /></button>
      </div>
    </div>
  );
}

export default ChatRoom;