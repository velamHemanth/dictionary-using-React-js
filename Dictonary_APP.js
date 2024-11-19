import React, { useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import './Dictionary.css'

function Dictonary_APP() {

    const[data,setData] = useState("")
    const[searchWord,setSearchWord] = useState("")

    function getMeaning(){
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
        .then((res)=>{
            setData(res.data[0])
        })
    }

    function audioPlay(){
        let audio = new Audio(data.phonetics[0].audio)
        audio.play()
    }
  return (
    <div className='app'>
        <div className='sub-app'>
        <h1>Free Dictionary</h1>
        <div className='Search-box'>
            <input type='text' placeholder='Search........' onChange={(e)=>{
                setSearchWord(e.target.value)
            }}/>
            <button onClick={getMeaning}><FaSearch size='20px' /></button>
        </div>
        { data && (
            <div className='showresult'>
                <h2>
                    <u>{data.word}{" "}</u>
                    <button onClick={audioPlay}>
                        <FcSpeaker size="26px"/>
                    </button>
                </h2>
                <h4>Parts Of Speech:</h4>
                <p>{data.meanings[0].partOfSpeech}</p>
                <h4>Definition:</h4>
                <p>{data.meanings[0].definitions[0].definition}</p>
                <h4>Example:</h4>
                <p>{data.meanings[0].definitions[0].example || "Example Is Not Avilable"}</p>
                
            </div>
        )}
        </div>
    </div>
  )
}

export default Dictonary_APP
