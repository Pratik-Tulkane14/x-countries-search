import axios, { AxiosResponse } from 'axios'
import './App.css'
import Card from './components/Card'
import Search from './components/Search'
import { useEffect, useState } from 'react';
const BASEURL = "https://restcountries.com/v3.1"
interface Country {
  name: {
    common: string,
    official: string,
    nativeName: {
      eng: {
        official: string,
        common: string,
      }
    }
  },
  tld: [],
  flags: {
    png: string,
    svg: string
  }
}
function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("")
  console.log(search, "search");

  const getCountries = async () => {
    try {
      const response: AxiosResponse<Country[]> = await axios.get(`${BASEURL}/all`);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCountries();
  }, [])
  useEffect(() => {
    if (search != "") {
      const data = countries.filter((item) => item.name.official.toLowerCase().includes((search.toLowerCase())))
      console.log("data", data);
      setCountries(data)

    }
    if (search === "") {
      getCountries()
    }
  }, [search])


  return (
    <>
      <div className='search-wrapper'>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="card-wrapper">
        {countries?.map((ele, index) => {
          return <Card key={index} src={ele.flags.png} alt={"Country flag"} countryName={ele.name.official} />
        })}
      </div>
    </>
  )
}

export default App
