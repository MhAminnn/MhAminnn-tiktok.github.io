document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcomeMessage');
    setTimeout(() => {
        welcomeMessage.remove();
    }, 5000);

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
                    <button id="downloadVideoButton" type="button">
                        Download Video
                    </button>
                    <button id="downloadMusicButton" type="button">
                        Download Music
                    </button>
                `;

                const downloadVideoButton = document.getElementById('downloadVideoButton');
                downloadVideoButton.addEventListener('click', async () => {
                    try {
                        const downloadResponse = await axios.get(data.data.play, {
                            responseType: 'blob'
                        });
                        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'tiktok_video.mp4');
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                    } catch (error) {
                        console.error('Download video error:', error);
                        result.textContent = 'Terjadi kesalahan saat mengunduh video. Coba lagi.';
                    }
                });

                const downloadMusicButton = document.getElementById('downloadMusicButton');
                downloadMusicButton.addEventListener('click', async () => {
                    try {
                        const musicUrl = data.data.music; // Assuming the API provides the music URL in this field
                        const downloadResponse = await axios.get(musicUrl, {
                            responseType: 'blob'
                        });
                        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'tiktok_music.mp3');
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                    } catch (error) {
                        console.error('Download music error:', error);
                        result.textContent = 'Terjadi kesalahan saat mengunduh musik. Coba lagi.';
                    }
                });

            } else {
                result.textContent = 'Gagal mengunduh video. Coba lagi.';
            }
        } catch (error) {
            console.error(error);
            result.textContent = 'Terjadi kesalahan. Coba lagi.';
        }
    });
});