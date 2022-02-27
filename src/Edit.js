import React, { useState } from 'react';
import { useParams } from 'react-router';
import NavBar from './NavBar';
import { LanguageTitleCard } from './Cards';
import {useNavigate} from 'react-router-dom'
import { EditWordCard } from './Cards';



// TOHLE JE MOJE -- NEMAZ!!!!!

const Edit = ({New}) => {
  

    let {id} = useParams()

    let navigate = useNavigate()

    const [isSetted, setIsSetted] = useState(false);
    const [Title, setTitle] = useState('');
    const [Language, setLanguage] = useState('');
    const [WordCzech, setWordCzech] = useState('');
    const [WordOther, setWordOther] = useState('');
    const [myDict, setMyDict] = useState([]);
    

    const listOfVariables = []


   if (localStorage.getItem(id) === null) {
     console.log('Je nové')
   } else if (!isSetted) {
     console.log('Není nové')

     let LocStrObj = JSON.parse(localStorage.getItem(id))
     if (LocStrObj.title != Title) {setTitle(LocStrObj.title)}
     if (LocStrObj.dict != myDict) {setMyDict(LocStrObj.dict)}
     if (LocStrObj.language != Language) {setLanguage(LocStrObj.language)}
     
     setIsSetted(true)
   }
    
    function Save() {
        localStorage.setItem(id, JSON.stringify({title: Title, id:id, language: Language, dict:myDict}))
        console.log()
        setMyDict(JSON.parse(localStorage.getItem(id)).dict)
    }

    function addIntoDictonary () {
      // let dict =  JSON.parse(localStorage.getItem(id))['dict']

      
      try {
          var dict =  JSON.parse(localStorage.getItem(id))['dict']
        console.warn(dict)
      } catch (error) {
         var dict = {}
      }
      

      if (localStorage.getItem(id) !== null) {
        console.log('Existujeeeee')
      } else {
        console.log('neexisuje')
      }

      // Generate translation id -- important for editing and deleting single translate
      let list_of_ids = []
      for (let index = 0; index < dict.length; index++) {
        list_of_ids.push(dict[index].id)
      }
      let iddd = 0
      while (true) {
        iddd += 1
       if (!( list_of_ids.includes(iddd))) {break}
      }

      
      myDict.push({WordCzech, WordOther, id:iddd});
      setWordCzech('');
      setWordOther('');

      Save()

    }

    const TohleNemazAleNikdeNepouzivej = 0
    function getKey() {
      TohleNemazAleNikdeNepouzivej += 1
      return TohleNemazAleNikdeNepouzivej      
    }

    function updateStorageAfterEditingTranslate(translateId, InpurWordCzech, InpurWordOther) {
      console.info('Ahoj -- updatuju list after editing')
      let dict =  JSON.parse(localStorage.getItem(id))['dict']
      
      console.log(translateId, InpurWordCzech, InpurWordOther)
      for (let i = 0; i < dict.length; i++) {
        const obj = dict[i];

        if (obj.id == translateId) {
          obj.WordCzech = InpurWordCzech
          obj.WordOther = InpurWordOther
          dict[i] = obj
          break
        }
      }


      localStorage.setItem(id, JSON.stringify({title: Title, id:id, language: Language, dict:dict}))

      setMyDict([])
      setTimeout(() => setMyDict(dict), 10)
      
      console.debug(dict)
    }

    function deleteTransalteFromDict (translateId) {

      let tempDict =  JSON.parse(localStorage.getItem(id))['dict']
      let output = []

      console.log(tempDict)
      for (let i = 0; i < tempDict.length; i++) {
        const element = tempDict[i];
        if (element.id !== translateId) {
          output.push(element)
        }
      }

      localStorage.setItem(id, JSON.stringify({title: Title, id:id, language: Language, dict:output}))
      setMyDict([])

      setTimeout(() => setMyDict(output), 0)
      
    }


      
  return <div className="content">

      <NavBar M_txt={New ? "Edit " + id : 'Add new' } L_icon="arrow-simple-left" R_icon="form" L_link="/" R_link={'/quiz/' + id}/>
      <div className="content-padding">
      
        <LanguageTitleCard title={Title} changeFunction={setTitle} />

        <div className="w-100 center">
        <div className='language-selection center '>
            <input label="NJ" type="radio" id="NJ" name='LANGUAGE' value='NJ'  checked={Language === 'NJ'} onChange={(e) => setLanguage(e.target.value)}/>
            <input label="AJ" type="radio" id="AJ" name='LANGUAGE' value='AJ' checked={Language === 'AJ'} onChange={(e) => setLanguage(e.target.value)} />
            <input label="RJ" type="radio" id="RJ" name='LANGUAGE' value='RJ' checked={Language === 'RJ'} onChange={(e) => setLanguage(e.target.value)} />
          </div>
        </div>

        <div className="EditTranslateCard EditTranslateCard-main">
          <input placeholder="Česky"  value={WordCzech} onChange={(e) => setWordCzech(e.target.value)}/>
          <input placeholder="English" value={WordOther} onChange={(e) => setWordOther(e.target.value)}/>
          <button onClick={() => addIntoDictonary()} >Přidat</button>
        </div>




        <div className="">

          {myDict.map((set) => (<EditWordCard obj={set}  deleteSlovicko={() => deleteTransalteFromDict(set.id)} afterEditing={updateStorageAfterEditingTranslate}  />))}

        </div>

        <button className="bg-green center w-100 one-line-button-padding" onClick={() => Save()}>Save</button>

        <div className="icon"></div>
      </div>
  </div>;
};

export default Edit;





