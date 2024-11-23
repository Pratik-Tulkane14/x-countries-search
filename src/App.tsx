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
  const [filteredData, setFilteredData] = useState<Country[]>([])
  const [search, setSearch] = useState<string>("")
  // console.log(countries, "countries");

  const getCountries = async () => {
    try {
      const response: AxiosResponse<Country[]> = await axios.get(`${BASEURL}/all`);
      setCountries(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCountries();
  }, [])
  useEffect(() => {
    if (search != "") {
      const data = countries.filter((item) => item.name.common.toLowerCase().includes((search.toLowerCase())))
      setFilteredData(data)

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
      {filteredData.length === 0 ? <p className='no-result'>no results</p> : <div className="card-wrapper">
        {filteredData?.map((ele, index) => {
          return <Card key={index} src={ele.flags.png} alt={"Country flag"} countryName={ele.name.common} />
        })}
      </div>}
    </>
  )
}

export default App
