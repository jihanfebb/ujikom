import {
  ConfigAxios,
  LayoutPage,
  Link,
  React,
  useEffect,
  useNavigate,
  useParams,
  useState,
} from "../export";

const Album = () => {
  const nav = useNavigate()
  const [fotos, setFotos] = useState([]);
  const [album, setAlbum] = useState([]);
  const [namaAlbum, setNamaAlbum] = useState('');
  const [deskripsiAlbum, setDeskripsiAlbum] = useState('');
  const [newAlbum, setNewAlbum] = useState(false);

  const slug = useParams().slug;

  useEffect(() => {
    const fetchData = async () => {
      const response = await ConfigAxios.get(`/album/${slug}`);
      setFotos(response.data.data.fotos);
      setAlbum(response.data.data);
      setNamaAlbum(response.data.data.nama);
      setDeskripsiAlbum(response.data.data.deskripsi);
    };

    fetchData();
  }, []);

  const createAlbum = () => {
    setNewAlbum(!newAlbum);
  };

  const UpdateAlbum = async(e) => {
    e.preventDefault();

    const response = await ConfigAxios.put(`/album/${slug}`, new FormData(e.target))
    response.data.msg === "success" ? createAlbum() : ""

    const fetchData = async () => {
      const response = await ConfigAxios.get(`/album/${slug}`);
      setFotos(response.data.data.fotos);
      setAlbum(response.data.data);
      setNamaAlbum(response.data.data.nama);
      setDeskripsiAlbum(response.data.data.deskripsi);
    };

    fetchData();
  }

  async function deleteAlbum(albumId) {
    const res = await ConfigAxios.delete(`/album/${albumId}`);
    res.data.msg === "success" ? nav("/profile") : alert("hapus gagal")
    console.log(res.data.msg);
  }

  return (
    <LayoutPage>
      <div className="flex items-center justify-between gap-3 w-full md:w-3/4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">album {album.nama}</h1>
          <p className="text-sm font-semibold text-slate-600/60">
            {album.deskripsi}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800" onClick={createAlbum}>buat album</div>
          <div className="text-black bg-white-900 hover:bg-white-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white-900 dark:hover:bg-white-800 dark:focus:ring-white-800 dark:border-white-800" onClick={() => deleteAlbum(album.id)}>hapus album</div>
        </div>
      </div>
      <div className="grid-layout">
        {fotos.map((foto, index) => (
          <Link to={`/detail/${foto.id}`} key={index} className="card-container">
            <img src={foto.url} alt="" className="card-img h-52" />
            <p className="card-text">{foto.username}</p>
          </Link>
        ))}
      </div>
      {newAlbum &&(
        <div className="modal-bg">
            <form onSubmit={UpdateAlbum} className="modal bg-gray-500">
                <input type="text" className="input bg-primary ring ring-gray-300 hover:ring-gray-500" placeholder="nama album" name="nama" id="nama" value={namaAlbum} onChange={(e) => setNamaAlbum(e.target.value)} />
                <input type="text" className="input bg-primary ring ring-gray-300 hover:ring-gray-500" placeholder="deskripsi" name="deskripsi" id="deskripsi" value={deskripsiAlbum} onChange={(e) => setDeskripsiAlbum(e.target.value)} />
                <div className="flex items-center gap-4">
                    <button type='submit' className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800">simpan</button>
                    <div className="text-black bg-white-900 hover:bg-white-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-white-900 dark:hover:bg-white-800 dark:focus:ring-white-800 dark:border-white-800" onClick={createAlbum}>Batal</div>
                </div>
            </form>
        </div>
    )}
    </LayoutPage>
  );
};

export default Album;
