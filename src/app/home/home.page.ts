import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ListOfCities:any=[];

  constructor(public httpclient:HttpClient) {
    if(this.ListOfCities.length==0){
      for(let i=0;i<9;i++){
        this.ListOfCities.push({"ontype":false,"city":"","error":"","weatherData":{}});
      }
      console.log(this.ListOfCities);
    }
  }

  OnEmptyClick(val){
    for(let i=0;i<this.ListOfCities.length;i++){
      if(i==val){
        this.ListOfCities[i].ontype=true;
      }else 
      this.ListOfCities[i].ontype=false;
    }
    console.log(this.ListOfCities);
  }

  checkCityData(value,index){
    console.log(value.detail.value);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${value.detail.value}&appid=4d64c92fc72ebeeb92a7fba4b02f124b`;
    var data=this.httpclient.get(url);
    data.subscribe(data=>{
      console.log(data);
      this.ListOfCities[index].weatherData={"city":data["name"],"climate":data["weather"][0]["main"] };
      this.ListOfCities[index].ontype=false;
      this.ListOfCities[index].error="";
    },(error)=>{console.log(error.statusText);
      this.ListOfCities[index].error="Data not found"
    })
  }

  showImage(val){
    if(this.ListOfCities[val].weatherData.length!=0){
      if(this.ListOfCities[val].weatherData.climate=="Clouds")
      return "cloudImage";
      else if (this.ListOfCities[val].weatherData.climate=="Rain")
      return "rainImage";
      else if (this.ListOfCities[val].weatherData.climate=="Clear")
      return "sunImage";
    }
  }

}
