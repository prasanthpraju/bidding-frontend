import Hero from '../components/Hero'

interface HomeProps {
  isLoggedIn: boolean
}

const Home = ({ isLoggedIn }: HomeProps) => {
  return <Hero isLoggedIn={isLoggedIn} />
}

export default Home