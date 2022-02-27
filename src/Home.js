import React from 'react';
import TextAnimation from './TextAnimation';
import Filter from './Filter';
import NavBar from './NavBar';
import { NewLessonCard, LessonCard } from './Cards';
import { useState } from 'react';

const Home = () => {
  const [LanguageFilter, setLanguageFilter] = useState('');
  const [NameFilter, setNameFilter] = useState('');

  const [timePodnadpis, setTimePodnadpis] = useState('');


  const PakVymazList = []

  Object.keys(localStorage).forEach(function(key){
    try {
      let xd = localStorage.getItem(key)
      PakVymazList.push(JSON.parse(xd))
      //PakVymazList.push(JSON.stringify(xd))
      
    } catch (error) {
      console.log('nelze jsonifikovat')
    }
  });

  
    function filterFunction (xx) {

      return (
        !!xx.id 
            &&
        xx.language.includes(LanguageFilter) 
            && 
        xx.title.toLowerCase().includes(NameFilter.toLowerCase()))
    }


    function getTimee () {
      var time = new Date()
      var hours = time.getHours()
      console.log(time.getHours())

      var delay = 3000
      if (0 < hours < 10) {
        // Is morning
        setTimePodnadpis('Dobré ráno')
        setTimeout(() => setTimePodnadpis('Good morning'), delay)
        setTimeout(() => setTimePodnadpis('Guten Morgen'), delay * 2)
        setTimeout(() => setTimePodnadpis('Buenos días'), delay * 3)
        setTimeout(() => setTimePodnadpis(''), delay * 4)
      } else if (11 < hours < 15) {
        // Is noon
        setTimePodnadpis('Ahoj')
        setTimeout(() => setTimePodnadpis('Hello'), delay)
        setTimeout(() => setTimePodnadpis('Hallo'), delay * 2)
        setTimeout(() => setTimePodnadpis('Hola'), delay * 3)
        setTimeout(() => setTimePodnadpis(''), delay * 4)
      } else if (16 < hours < 25) {
        // Is evening
        setTimePodnadpis('Dobrý večer')
        setTimeout(() => setTimePodnadpis('Good evening'), delay)
        setTimeout(() => setTimePodnadpis('Guten Abend'), delay * 2)
        setTimeout(() => setTimePodnadpis('Buenas noches'), delay * 3)
        setTimeout(() => setTimePodnadpis(''), delay * 4)
      }

    }

    if (timePodnadpis == '') {
      getTimee()
    }




  return <>
    <NavBar L_txt="PSProject" R_icon="settings" R_link="/settings" L_link=""/> 
    <div className="content ">
      <h1>ProLucku</h1>
      <h3>{timePodnadpis}</h3>
      


        <div className="filter">
          <div className="center">
          <input type="text" value={NameFilter} onChange={(e) => setNameFilter(e.target.value)}/>
          <div className="icon i-magnifiingglass icon-small"></div>
          </div>
        <div className='language-selection center'>
            <input label="NJ" type="radio" id="NJ" name='LANGUAGE' value='NJ'  checked={LanguageFilter === 'NJ'} onChange={(e) => setLanguageFilter(e.target.value)}/>
            <input label="AJ" type="radio" id="AJ" name='LANGUAGE' value='AJ' checked={LanguageFilter === 'AJ'} onChange={(e) => setLanguageFilter(e.target.value)} />
            <input label="RJ" type="radio" id="RJ" name='LANGUAGE' value='RJ' checked={LanguageFilter === 'RJ'} onChange={(e) => setLanguageFilter(e.target.value)} />
          </div>


          
          
        </div>
      <div className="content-padding">





        {PakVymazList.filter(filterFunction).map((obj, index) => (<LessonCard  id={obj.id} title={obj.title} content='Home.js line:53' />))}



        <NewLessonCard/>
      </div>

    </div>
    
  </>;
};

export default Home;
