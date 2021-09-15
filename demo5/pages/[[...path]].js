import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '../components/navbar';

function Test({ sitemap }) {
  const router = useRouter();
  const path = router.query.path || [];
  return (
    <Navbar sitemap={sitemap}/>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost/json/sites/default/?levels=3');
  const sitemap = await res.json();
  return {
    props: { sitemap }
  }
}

/*
export async function getStaticProps(context) {
  const res = await fetch('http://localhost/json/sites/default/?levels=3');
  const sitemap = await res.json();
  return {
    props: { sitemap }
  }
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost/json/sites/default/?levels=3')
  const sitemap = await res.json()
  const paths = [{ params: { test: [] } }]
  return { paths, fallback: 'blocking' }
}
*/

export default Test;
