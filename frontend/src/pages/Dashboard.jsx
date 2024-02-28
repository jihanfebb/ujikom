import { ConfigAxios, LayoutPage, Link, React, useState, useEffect } from "../export";

const Dashboard = () => {
  const [fotos, setFotos] = useState([]);
  console.log(fotos);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ConfigAxios.get('/fotos');
      setFotos(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <LayoutPage>
      <div className="grid-layout">
        {fotos &&(

          fotos.map((foto, index) => (
            <Link to={`/detail/${foto.id}`} key={index} className="card-container w-full">
            <img src={foto.url} alt="" className="card-img h-52" />
            <p className="card-text">{foto.username}</p>
            </Link>
            ))
          )}
      </div>
    </LayoutPage>
  );
};

export default Dashboard;
