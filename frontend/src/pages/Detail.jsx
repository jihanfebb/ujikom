import {
  Comment,
  LayoutPage,
  React,
  useState,
  useEffect,
  ConfigAxios,
  useParams,
  DataContext,
  useContext,
  Link,
  useNavigate,
} from "../export";

const Detail = () => {
  const nav = useNavigate()
  const [img, setImg] = useState({});
  const [showComment, setShowComent] = useState(false);
  const [userNama, setUserNama] = useState("");
  const { user } = useContext(DataContext);
  const [like, setLiked] = useState(false);
  const slug = useParams().slug;

  const toggle = () => {
    setShowComent(!showComment);
  };

  // Fungsi callback untuk memperbarui data pada komponen Detail
  const updateData = async () => {
    const response = await ConfigAxios.get(`/foto/${slug}`);
    setImg(response.data.data.foto);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await ConfigAxios.get(`/foto/${slug}`);
      const { foto } = response.data.data;
      setLiked(response.data.data.like);
      setImg(foto);
      setUserNama(foto.user.nama);
    };

    fetchData();
  }, [slug]);

  async function likePhoto(fotoId) {
    const response = await ConfigAxios.post("/like", { foto_id: fotoId });
    setLiked(response.data.data);
  }

  async function unlikePhoto(fotoId) {
    const response = await ConfigAxios.delete(`/like/${fotoId}`);
    setLiked(false);
  }
  const liked = () => {
    like == false ? likePhoto(img.id) : unlikePhoto(like.id);
    updateData();
  };
  
  async function deletePhoto(fotoId) {
    const res = await ConfigAxios.delete(`/foto/${fotoId}`);
    res.data.msg === "success" ? nav("/profile") : alert("hapus gagal")
  }
 
  return (
    <LayoutPage showComment={showComment}>
      <div
        className={`flex flex-col w-full gap-6 justify-center pb-32 transition-all duration-300 ${
          showComment ? "items-start" : "items-center"
        }`}
      >
        <div className="flex justify-between items-center w-full md:w-2/3">
          {/* <div className="flex items-center gap-3">
            <img src="/pp.png" alt="" />
          </div> */}
            <p className="font-bold text-sm">
             By {userNama?.length ? userNama : "memuat"}
            </p>
          <div className="flex items-center gap-5">
            {user.id === img.user_id && (
              <>
                <Link to={`/edit/${img.id}`} className="cursor-pointer">edit</Link>
                <div className="cursor-pointer" onClick={() => deletePhoto(img.id)}>hapus</div>
              </>
            )}
            <div
              className={`icon-btn w-max flex items-center gap-2 ${
                showComment ? "bg-slate-600/20" : ""
              }`}
              onClick={toggle}
            >
              <img src="/komentar.svg" alt="" className="icon-5" />
              <p>{img.komentars ? img.komentars.length : ""}</p>
            </div>

            <div
              className="icon-btn w-max flex items-center gap-2"
              onClick={liked}
            >
              <img
                src={like ? "/Love.svg" : "/Heart.svg"}
                alt=""
                className="icon-5"
              />
              <p>{img.likes ? img.likes.length : ""}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6 items-start">
          <h1 className="text-xl md:text-3xl font-extrabold w-2/3 text-wrap font-inter">
            {img.nama}
          </h1>
          <p className="text-xs md:text-base font-semibold text-secondary/70 text-start w-full md:w-2/3 font-inter indent-2">
            {img.deskripsi}
          </p>
        </div>

        <img
          src={img.url}
          alt=""
          className="w-full md:w-2/3 rounded-xl max-h-[680px] object-cover"
        />
      </div>
      <Comment
        showComment={showComment}
        fotoId={img.id}
        Comments={img.komentars}
        updateData={updateData}
        user={user.id}
      />
    </LayoutPage>
  );
};

export default Detail;
