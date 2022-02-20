import React from 'react';
import NavBar from './NavBar';
import { useState } from 'react';

const Settings = ({Theme, ThemeStyle, ThemeColor, changeFunction}) => {


  function deleteAllLocalStorage() {
    localStorage.clear()
  }



  return <>
    <NavBar L_txt="Nastavení" R_icon="home" R_link="/" L_link=""/>
    
    <div className="content content-padding">
        <h1>Theme</h1>
          <h3>Theme accent</h3>
            <div className="language-selection center ">
              <input label="Light" type="radio" id="Light" name='THEME' value='Light'  checked={Theme === 'light'}    onChange={() => changeFunction('THEME', 'light')}/>
              <input label="Dark" type="radio" id="Dark" name='THEME' value='Dark' checked={Theme === 'dark'}  onChange={() => changeFunction('THEME', 'dark')}/>
              <input label="System" type="radio" id="System" name='THEME' value='System' checked={Theme === 'system' }  onChange={() => changeFunction('THEME', 'system')}/>
            </div>

            <h3>Theme style</h3>
            <div className="language-selection center ">
              <input label="Gradient" type="radio" id="Gradien" name='STYLE' value='Gradient' onChange={() => changeFunction('STYLE', 'gradient')}  checked={ThemeStyle === 'gradient'}/>
              <input label="Aurora" type="radio" id="Aurora" name='STYLE' value='Aurora'  onChange={() => changeFunction('STYLE', 'aurora')} checked={ThemeStyle === 'aurora'}/>
            </div>

            <h3>Theme color</h3>
            <div className="language-selection center ">
              <input label="Color01" type="radio" id="Color01" name='COLOR' value='Color01'   onChange={() => changeFunction('COLOR', 'color01')}  checked={ThemeColor === 'color01'}/>
              <input label="Color02" type="radio" id="Color02" name='COLOR' value='Color02'  onChange={() => changeFunction('COLOR', 'color02')}  checked={ThemeColor === 'color02'}/>
            </div>


        <h1>Data</h1>
            <h3>Cookies</h3>
                <p>Tato aplikace pokud vím nepoužívá žádné cookies, pouze ServiceWorker a včechna data ukládá do cache </p>
            <h3>Vymazat šechna data button</h3>

            <h3>Pak vymaz-- je to jen na vyzkouseni scrollBaru -- Jsem v Settings.js</h3>

            <button  onClick={() => deleteAllLocalStorage()}>Vymazat všechna data</button>

    </div>
  </>;
};

export default Settings;
