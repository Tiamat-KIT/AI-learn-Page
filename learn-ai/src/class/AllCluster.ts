import { PointType } from "../type/Point";
import { SingleCluster, SingleClusterClass } from "./SingleCluster";
import getNameOfMinValue from "../util/MinValueIndex";

interface AllCluster {
    Points: PointType[],
    FirstWeightPoints: {name: string, weightPoint: PointType}[],
    ClusterClassifying?: SingleCluster[],
    Kmeans(): {
      Clusters: SingleCluster[];
      weightPoint: {
          name: string;
          weightPoint: {
              x_position: number;
              y_position: number;
          };
      }[];
  }
}

export class ClusterClass implements AllCluster{
  Points: PointType[];
  ClusterClassifying: SingleCluster[];
  FirstWeightPoints: {name: string, weightPoint: PointType}[];

  constructor(
    FirstWeightPoints: {name: string, weightPoint: PointType}[],
    Points?: PointType[],
    ClusterClassifying?: SingleCluster[]
  ){

    this.Points = Points !== undefined ? Points : [[1,1],[1,2],[1,3],[1,5],[2,3],[2,4],[3,1],[4,1],[4,4],[5,3],[6,3],[6,5]].map((point) => ({
      x_position: point[0],
      y_position: point[1]
    }));
    this.FirstWeightPoints = FirstWeightPoints
    this.ClusterClassifying = ClusterClassifying !== undefined ?  ClusterClassifying : FirstWeightPoints.map((name) => new SingleClusterClass(name["name"]))
    FirstWeightPoints.forEach((WP) => {
      ClusterClassifying?.forEach(value => {
        if(value["Name"] === WP.name){
          value.Add(WP["weightPoint"])
        }
      }) 
    })
    
  }

  Kmeans(){
    this.Points.forEach((PointValue) => {
      const result_list = this.FirstWeightPoints.map((FirstPointValue) => {
        return {name: FirstPointValue["name"],distance: Math.sqrt((PointValue["x_position"] - FirstPointValue["weightPoint"]["x_position"])**2 + (PointValue["y_position"] - FirstPointValue["weightPoint"]["y_position"])**2)}
      });
      const MinName = getNameOfMinValue(result_list)
      this.ClusterClassifying.forEach((cluster) => {
        if(cluster["Name"] === MinName){
          cluster.Add(PointValue)
        }
      })
    })
    const weightPoint = this.ClusterClassifying.map((ClusterValue) => {
      const x = (ClusterValue.ClusterPoints.map((PontX) => {return PontX.x_position})).reduce((a,x) => {return a+x}) / ClusterValue.ClusterPoints.length
      const y = (ClusterValue.ClusterPoints.map((PontY) => {return PontY.y_position})).reduce((a,x) => {return a+x}) / ClusterValue.ClusterPoints.length
      return  {
        name: ClusterValue.Name,
        weightPoint:{x_position:x,y_position:y}
      }
    })
    return {
      Clusters: this.ClusterClassifying,
      weightPoint
    }
  }
}