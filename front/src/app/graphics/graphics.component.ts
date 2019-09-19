import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Popularity'},
  ];

  ngOnInit() {
    this.http
        .get<any>(environment.api + "api/getStatistics/")
        .subscribe(items => {
          items.data.forEach(item => {
            this.barChartLabels.push("( " + item.location + ", " + item.name + " )");
            var data = {data: item.popularity, label : item.location};
            this.barChartData[0].data.push(item.popularity);
          });
        });
  }

}
