// JavaScript logic for toggling the navbar
document.getElementById('menu-button').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    setTimeout(() => {
      welcomeMessage.remove();
    }, 5000);
  }

  const form = document.getElementById('download-form'); // Gantilah ID sesuai HTML
  const result = document.getElementById('result');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const tiktokUrl = document.getElementById('video-url').value; // Gantilah ID sesuai HTML

    const options = {
      method: 'GET',
      url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
      params: {
        url: tiktokUrl,
        hd: '1'
      },
      headers: {
        'x-rapidapi-key': 'bb88fa4bc5msha42a4c17f84c518p130026jsn00f7e4fdf3d3',
        'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data;

      if (response.status === 200 && data && data.data) {
        result.innerHTML = `
                    <div class="flex flex-col items-center">
                        <video controls class="video-preview w-full max-w-full">
                            <source src="${data.data.play}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="mt-4 w-full flex justify-between space-x-2">
                            <button id="downloadVideoButton" type="button" class="btn-primary flex-1 max-w-xs">
                                Download Video
                            </button>
                            <button id="downloadMusicButton" type="button" class="btn-primary flex-1 max-w-xs">
                                Download Music
                            </button>
                        </div>
                    </div>
                `;

        const downloadVideoButton = document.getElementById('downloadVideoButton');
        downloadVideoButton?.addEventListener('click', async () => {
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
        downloadMusicButton?.addEventListener('click', async () => {
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

