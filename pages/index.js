import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BlockForm from '../lib/BlockForm'
import SearchForm from '../lib/SearchForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <BlockForm/>
      <SearchForm/>
    </div>
  )
}
