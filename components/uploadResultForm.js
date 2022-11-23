import { useState } from "react";

const UploadResultForm = () => {
    const [file, setFile] = useState();

    const onSelectFile = event => {
        setFile(event.target.files[0]);
    };

    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('lotteryResult', file);
        formData.append('filename', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        console.log(file);
        const response = await fetch('/api/lottery', {
            method: 'post',
            body: formData
        });
        console.log(response);
        // const result = JSON.parse(response);
        // console.log(result);
    };

    return (
        <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <input type="file" name="lotteryResult" onChange={onSelectFile} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadResultForm;