import { NextPage } from "next";
import HomePage from "./HomePage";

const Home: NextPage = () => {   

  return (
    <div>         
      <HomePage users={undefined} />
    </div>
  )
}

export default Home