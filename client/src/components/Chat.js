import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";

import { fileDownload } from 'js-file-download';

import FormData from "form-data";

let fileType = "";

function Chat({ messages, roomName, roomId, url }) {
    const [input, setInput] = useState("");
    const userName = useSelector((state) => state.user.name);
    const sendMessageHandler = async (event) => {
        event.preventDefault();
        const data = input;
        await axios.post(`http://localhost:9000/api/v1/message/${roomId}/new`, {
            name: userName,
            message: data,
            timestamp: new Date().toISOString(),
            received: true,
        });
        setInput("");
    };

    const [state, setState] = useState({ file: null, type: null });

    const handleFile = async (event) => {
        event.preventDefault();
        // const file = event.target.files[0];
        // const type = fileType;
        // console.log("type=" + type);
        setState({ file: event.target.files[0], type: fileType }, () => {
            console.log("stateFile:", state.file);
        });
        console.log("event=" + event.target);
    };

    const handleUpload = async (event) => {
        console.log("stateFile:", state.type);

        event.preventDefault();
        // console.log("fileis:", imageFile);
        let transferForm = new FormData();

        await transferForm.append(state.type, state.file);
		await transferForm.append("name", userName);
		await transferForm.append("timestamp", new Date().toISOString())
		await transferForm.append("received", true)
        // console.log("form is:", imageForm);

        if (fileType == "image") {
            URL = `http://localhost:9000/api/v1/message/${roomId}/uploadFile/image`;
        } else if (fileType == "video") {
            URL = `http://localhost:9000/api/v1/message/${roomId}/uploadFile/video`;
        } else if (fileType == "pdf") {
            URL = `http://localhost:9000/api/v1/message/${roomId}/uploadFile/pdf`;
        }

        console.log("It is", transferForm.file);

        await axios({
            url: URL,
            method: "POST",
            data: transferForm,
            name: userName,
            timestamp: new Date().toISOString(),
            received: true,
			
			
        });
        setState({ file: null });
        setUploadOpen(!uploadOpen);
        setOpen(!open);
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
        setUploadOpen(!uploadOpen);
        console.log("Pressed");
    };
    const [uploadOpen, setUploadOpen] = React.useState(false);
    const uploaderOpen = (parameter) => {
        console.log(parameter);
        setUploadOpen(!uploadOpen);
        fileType = parameter;
    };

    const handleDownload = (prop) => {
		console.log("prop=",prop)
		console.log("http@"+`http://localhost:9000${prop}`)
		

        axios({
            url: `http://localhost:9000${prop}`,
            method: 'GET',
            responseType: 'blob', // Important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fileDownload'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
      
        
        // const res = axios({
        //     method: "GET",
        //     url: `http://localhost:9000${prop}`,
        //     responseType: "blob",
        // })
		// .then((res)=>{
		// 	const url = window.URL.createObjectURL(new Blob([res.data]))
		// 	const link = document.createElement('a')
		// 	link.href = link
		// 	link.setAttribute('download', 'image.jpg')
		// 	document.body.appendChild(link)
		// 	link.click()
		// })

        
	};

    return (
        <div className="chat">
            <div className="chat__header">
                <img src={url} alt="Avatar" className="avatar" />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen...</p>
                </div>
                <div className="chat__headerRight">
                    <i className="fa fa-search"></i>

                    <div className="dropdown">
                        <button className="upload" onClick={handleOpen}>
                            &#128206;
                        </button>
                        {open ? (
                            <ul className="menu">
                                <li className="menu-item">
                                    <button
                                        className="addImage"
                                        onClick={(e) => uploaderOpen("image")}
                                    >
                                        Add Image
                                    </button>
                                </li>
                                <li className="menu-item">
                                    <button
                                        onClick={(e) => uploaderOpen("video")}
                                        className="addVideo"
                                    >
                                        Add Video
                                    </button>
                                </li>
                                <li className="menu-item">
                                    <button
                                        onClick={(e) => uploaderOpen("pdf")}
                                        className="addPDF"
                                    >
                                        Add PDF
                                    </button>
                                </li>

                                {uploadOpen ? (
                                    <div className="uploadingUI">
                                        <form
                                            // onSubmit={uploadImageHandler}
                                            className="uploadingForm"
                                            encType="multipart/form-data"
                                        >
                                            <input
                                                type={"file"}
                                                name={`${fileType}`}
                                                // name="image"
                                                onChange={(event) =>
                                                    handleFile(event)
                                                }
                                            />
                                            <h2>{fileType}</h2>
                                            <button
                                                type="submit"
                                                onClick={(event) =>
                                                    handleUpload(event)
                                                }
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                ) : null}
                            </ul>
                        ) : null}
                    </div>
                    <i className="material-icons">more_vert</i>
                </div>
            </div>
            <div className="chat__body">
                {messages &&
                    messages.map((message) => (
                        <p
                            className={`chat__message ${
                                message.name === userName && "chat__received"
                            }`}
                            key={message._id}
                        >
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span>
                                {typeof message.downloadURL != "undefined" ? (
                                    <a
                                        onClick={(event) =>
                                            handleDownload(message.downloadURL)
                                        }
                                    >
                                        Download Here
                                    </a>
                                ) : null}
                                {console.log(
                                    "downloadLink:",
                                    message.downloadURL
                                )}
                            </span>
                            <span className="chat__timestamp">
                                {message.timestamp}
                            </span>
                        </p>
                    ))}
            </div>

            <div className="chat__footer">
                <i className=" emoji fa fa-smile-o"></i>
                <form onSubmit={sendMessageHandler}>
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        type="text"
                        placeholder="Type a meesage"
                    />
                    <button type="submit">Send a message</button>
                </form>
                <i className="microphone fa fa-microphone"></i>
            </div>
        </div>
    );
}

export default Chat;
