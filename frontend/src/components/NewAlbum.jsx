import { ConfigAxios, useNavigate } from '../export';

const NewAlbum = ({createAlbum, setAlbums}) => {
  const BuatAlbum = async(e) => {
    e.preventDefault();

    const response = await ConfigAxios.post('/album', new FormData(e.target))
    response.data.msg ? createAlbum() : ""
    console.log(response);

    const getAlbums = async () => {
      const response = await ConfigAxios.get('/album');
      setAlbums(response.data.data);
      // console.log(response.data.data);
    };

    getAlbums()
  }
  return (
    <div className="modal-bg">
        <form onSubmit={BuatAlbum} className="modal bg-gray-500">
            <h1 className="font-koulen text-xl">album baru</h1>
            <p className="text-xs font-inter text-secondary/70 w-1/2">Masukan foto momen momen manis mu!</p>
            <input type="text" className="input bg-primary ring ring-gray-300 hover:ring-gray-500" placeholder="nama album" name="nama" id="nama" />
            <input type="text" className="input bg-primary ring ring-gray-300 hover:ring-gray-500" placeholder="deskripsi" name="deskripsi" id="deskripsi" />
            <div className="flex items-center gap-4">
                <button type='submit' className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800">Buat!</button>
                <div className="text-black bg-white-900 hover:bg-white-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white-900 dark:hover:bg-white-800 dark:focus:ring-white-800 dark:border-white-800" onClick={createAlbum}>Batal</div>
            </div>
        </form>
    </div>
  )
}

export default NewAlbum
