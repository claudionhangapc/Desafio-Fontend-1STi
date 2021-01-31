
/************************
 * obtendo alguns elementos
************************/
const span_close = document.getElementById("span_close");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const temp_min = document.getElementById("temp_min");
const temp_max = document.getElementById("temp_max");
const wind_speedy = document.getElementById("wind_speedy");
const sensacao = document.getElementById("sensacao");
const container_search = document.getElementById("container_search");
const url = 'https://api.hgbrasil.com/weather?format=json-cors&key=100b7dde&city_name=';

const days_of_the_week = {
  Dom:"Domingo",
  Seg:"Segunda",
  Ter:"Terça",
  Qua:"Quarta",
  Qui:"Quinta",
  Sex:"Sexta",
  Sáb:"Sabado"
}




/*************************
*Desnvolvimento de funções
************************/

function addDayOfWeek(day,temp_min, temp_max){
  
  const li = document.createElement("li");
  const p_day = document.createElement("p");
  const p_temp = document.createElement("p");
  const span_temp_min =document.createElement("span");
  const span_temp_max =document.createElement("span");

  p_day.innerText = day;
  span_temp_min.innerText = temp_min+'º';
  span_temp_max.innerText = temp_max+'º';

  p_temp.appendChild(span_temp_min);
  p_temp.appendChild(span_temp_max);
  li.appendChild(p_day);
  li.appendChild(p_temp);

  p_day.classList = "container__item1__content__week--font-size";
  p_temp.classList = "container__item1__content__week--color";
  li.classList = "container__item1__content__week_ul--margin-right";
  
  return li;
}

function addAllDaysOnTheList(array_day,days_of_the_week){
 
  let day;
  let temp_min;
  let temp_max;
  const list_day_of_the_week = document.getElementById("list_day_of_the_week");
        list_day_of_the_week.innerHTML="";

  for(i=1;i<6;i++){
    day = days_of_the_week[array_day[i].weekday];
    temp_min = array_day[i].min;
    temp_max = array_day[i].max;
    list_day_of_the_week.appendChild(addDayOfWeek(day,temp_min,temp_max));
  }
  
}

function addInfoWeatherHeader(response_jason){
  
  temp.innerText = response_jason.results.temp+'ºC '+response_jason.results.description;
  temp_max.innerText = response_jason.results.forecast[0].max+'º';
  temp_min.innerText = response_jason.results.forecast[0].min+'º';
  city.innerText = response_jason.results.city+' - Brasil';
  humidity.innerText = response_jason.results.humidity+'%';
  sensacao.innerText = getThermalSensation(response_jason.results.wind_speedy[0], response_jason.results.temp)+'º';
  wind_speedy.innerText = response_jason.results.wind_speedy.replaceAll(/\s/g,'');

}

function getWeahterByCity(){
  const city_name = document.getElementById("input_search").value;
  if(city_name ==""){
    alert("Preencha o campo com o nome da cidade");
  }else{
    fetch(url+city_name).then(function(response){
      return response.json();
    }).then(function(response_jason){
      
      if(response_jason.error===true){
        alert(response_jason.message);
      }else{
        if(response_jason.by=="default"){
          alert("Cidade não encontrada");
        }else{
          
          addInfoWeatherHeader(response_jason)
          addAllDaysOnTheList(response_jason.results.forecast,days_of_the_week);
          container_search.classList.add("ativo");
        } 
      }
    });
  } 
}

function getThermalSensation(velocidade, temperatura){
  const st = 33 + (10*Math.sqrt(velocidade) + 10.45 - velocidade)*((temperatura-33)/22);
  return st.toPrecision(2);
}


function closeBox(){
  container_search.classList.remove("ativo");
  document.getElementById("input_search").value="";
}


/*********************
*chamando as funcçoes
**********************/

document.getElementById("click_search").addEventListener("click",getWeahterByCity);
span_close.addEventListener("click",closeBox);