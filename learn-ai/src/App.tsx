import { JSX, createSignal } from 'solid-js'
import './App.css'
import { ClusterClass } from './class/AllCluster';
import { SingleClusterClass } from './class/SingleCluster';
import { PointType } from './type/Point';

type FormEventHandler = JSX.EventHandler<HTMLFormElement, SubmitEvent>

function App() {
  const [ClusterSignal,setCluster] = createSignal<SingleClusterClass[]>(
    [
      new SingleClusterClass("1"),
      new SingleClusterClass("2"),
      new SingleClusterClass("3")
    ]
  )
  const [weightPoint,setWeightPoint] = createSignal<{name: string, weightPoint: PointType}[]>(
    [
      {
        name:"1",
        weightPoint: {
          x_position: 0,
          y_position: 0
        }
      },{
        name: "2",
        weightPoint: {
          x_position:0,
          y_position:0
        }
      },
      {
        name: "3",
        weightPoint:{
          x_position: 0,
          y_position: 0
        }
      }
    ]
  )
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget);
    setWeightPoint([
      {
        name:"1",
        weightPoint: {
          x_position: form.get("x1") as unknown as number,
          y_position: form.get("y1") as unknown as number
        }
      },{
        name: "2",
        weightPoint: {
          x_position:form.get("x2") as unknown as number,
          y_position:form.get("y2") as unknown as number
        }
      },
      {
        name: "3",
        weightPoint:{
          x_position: form.get("x3") as unknown as number,
          y_position: form.get("y3") as unknown as number
        }
      }
    ])

    const ResultCluster = new ClusterClass(weightPoint(),undefined,ClusterSignal())
    setCluster(ResultCluster.Kmeans().Clusters)
    setWeightPoint(ResultCluster.Kmeans().ResultWeightPoint)
    console.log(ResultCluster.Kmeans().ResultWeightPoint)
    console.log(ClusterSignal())
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{display: "flex","flex-direction": "column"}}>
        <div>
          <label>クラスタ1の重心座標</label>
          <input name='x1' type='number'/>
          <input name='y1' type='number'/>
        </div>
        <div>
          <label>クラスタ2の重心座標</label>
          <input name='x2' type='number'/>
          <input name='y2' type='number'/>
        </div>
        <div>
          <label>クラスタ3の重心座標</label>
          <input name='x3' type='number'/>
          <input name='y3' type='number'/>
        </div>
        <input type="submit">登録</input>
      </form>
    </>
  )
}

export default App
