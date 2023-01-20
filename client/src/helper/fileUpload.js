import axios from "axios";


export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/alvarez-fabricio-nicolas/upload';
    const formDate = new FormData();
    formDate.append('upload_preset', 'library-react');
    formDate.append('file', file);

    try {
        const resp = await axios.post(cloudUrl, formDate).then((resp) => (resp));

        if (resp.statusText === "OK") {
            
            const cloudResp = resp.data.secure_url;
            return cloudResp;

        } else {
            //throw await resp.json()
        }

    } catch (error) {
        throw error
    }
}