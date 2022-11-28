

  const [click, setClick] = useState(false);
  const [data, setData] = useState([]);
  const nome = useRef("nome");
  const [mostra, setMostra] = useState("");
  const handleClick = () => setClick(!click);


  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((json) => setData(json.data.memes)); //METTE L'OGGETTO JSON NELLA VARIABILE DATA
  }, [click]);


function Navbar(){
    return(
        <div>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {data.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
  );
}
