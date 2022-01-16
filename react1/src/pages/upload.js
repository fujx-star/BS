import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const Input = styled('input')({
    display: 'none',
});

export default function Upload() {

    let username = useLocation().state.username;
    let navigate = useNavigate()

    function handleInput(event) {
        const my_files = []
        let files = event.currentTarget.files
        console.log(files)
        for(let i = 0;i < files.length;i++) {
            my_files.push({name: files[i].name, uploader: username})
        }
        axios({
            method: 'post',
            url: 'http://localhost:8082/addimage',
            data: my_files
        }).then(response => {
            if(response.data) {
                alert('upload succeed!')
                // navigate("/upload", {state: {username: username}, replace: true})
            }
            else {
                alert('upload failed!')
            }
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
                <Input onInput={handleInput} accept="image/*" id="contained-button-file" multiple type="file"/>
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <label htmlFor="contained-button-file">
                <Button onClick={()=>{navigate("/image", {state: {username: username}, replace: true})}}  variant="contained" component="span" >
                    My Photos
                </Button>
            </label>
        </Stack>
    )
}


