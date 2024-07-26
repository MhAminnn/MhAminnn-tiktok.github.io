document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('downloadForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const tiktokUrl = document.getElementById('url').value;

        const options = {
            method: 'GET',
            url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
            params: {
                url: tiktokUrl,
                hd: '1'
            },
            headers: {
                'x-rapidapi-key': '5e42e42d02msh2e7abfe7aed9d46p149460jsnb67dbb68e538',
                'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const data = response.data;

            if (response.status === 200 && data && data.data) {
                result.innerHTML = `
                    <video controls class="video-preview">
                        <source src="${data.data.play}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <a href="${data.data.play}" target="_blank" download>
                        <button type="button">
                            Download Video
                        </button>
                    </a>
                `;
            } else {
                result.textContent = 'Gagal mengunduh video. Coba lagi.';
            }
        } catch (error) {
            console.error(error);
            result.textContent = 'Terjadi kesalahan. Coba lagi.';
        }
    });
});