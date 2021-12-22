
const get = async (url) => {
    try {

        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            const message = await response.text()
            throw new Error(`${response.status} - ${message || response.statusText}`);
        }

        const data = await response.json();
        // console.log(data);
        return data;

    } catch (err) {
        console.error(err);
        return err;
    }
}

const post = async (url, values) =>{
    try {
        const response = await fetch(url, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (!response.ok) {
            const message = await response.text()
            throw new Error(`${response.status} - ${message || response.statusText}`);
        }
        // console.log(response.status, response.statusText);
        return response;
    } catch (err) {
        console.error(err); // ******** this doesn't seem to be showing up, try following it in debugger
        return err;
    }
}

const exports = {get, post};

export default exports;