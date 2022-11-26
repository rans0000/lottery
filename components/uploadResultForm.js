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
        try {
            const response = await fetch('/api/lottery', {
                method: 'post',
                body: formData,
            });
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
            <input type="file" name="lotteryResult" onChange={onSelectFile} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadResultForm;