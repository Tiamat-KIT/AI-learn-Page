import { PointType } from "../type/Point"
export interface SingleCluster {
    Name: string,
    ClusterPoints: PointType[],
    Add(Point: PointType): void
    Del(Point: PointType): void
}

export class SingleClusterClass implements SingleCluster {
    Name: string
    ClusterPoints: PointType[] = []
    constructor(Name: string){
        this.Name = Name;
    }
    Add(Point: PointType): void {
        this.ClusterPoints.push(Point)
    }
    Del(Point: PointType): void {
        const index = this.ClusterPoints.indexOf(Point);
        this.ClusterPoints.splice(index, 1)
    }
}