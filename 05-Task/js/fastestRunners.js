/**
 * @typedef {Object} Runner
 * @property {String} name
 * @property {String[]} paces
 * @typedef {Object} Result
 * @property {String} name
 * @property {String} averagePace
 * @property {String} fastestPace
 */

/**
 * @param {Runner[]} runners
 * @return {Result[]}
 */
document.querySelector('.artboard').style.overflowY='scroll'
function fastestRunners(runners) {
	/* Work here */
	fetch('js/runners.json')
	.then(responce=>responce.json())
	.then(data=>{
		let averagesOfAll=[]
		let runnerData=[]
		data.map(runners=>{
			let paces=runners.paces
			let secondArray=paces.map(pace=>{
				let [min,sec]=pace.split(':').map(Number)
				return min*60+sec
			})
			let averPaceRunner=secondArray.reduce((a,b)=>a+b)/secondArray.length
			let personMin=Math.floor(averPaceRunner/60)
			let personSec=Math.ceil(averPaceRunner%60)
			
			let fastestPace=Math.min(...secondArray)
			let fastestMin=Math.floor(fastestPace/60)
			let fastestSec=Math.ceil(fastestPace%60)
			averagesOfAll.push(averPaceRunner)
			let finish=secondArray.reduce((a,b)=>a+b)
			let totalmin=Math.floor(finish/60)
			let totalSec=Math.ceil(finish%60)
			runnerData.push({
				name:runners.name,
				averagePace:`${personMin}:${personSec <10 ?'0' +personSec :personSec}`,
				fastestPace:`${fastestMin}:${fastestSec <10 ? '0' +fastestSec :fastestSec}`,
				totalTime:`${totalmin}:${totalSec <10 ? '0'+ totalSec:totalSec}`
			})
			
		})
		let totalAver=averagesOfAll.reduce((a,b)=>a+b)/averagesOfAll.length
		totalAver=String(Math.floor(totalAver/60))+Math.ceil(totalAver%60)
		
		runnerData=runnerData.filter(runner=>runner.averagePace.split(':').join('')<totalAver)
		runnerData=runnerData.sort((a,b)=>a.totalTime.split(':').join('')-b.totalTime.split(':').join(''))
		console.log(runnerData)
		runnerData.forEach(data=>{
			document.querySelector('p').innerHTML+=`
			<div class='bg-slate-800 p-4 rounded-xl mt-2 justify-between' style='display:flex;align-items:center'>
				<h3 class='text-white'>${data.name}</h3>
				<div style='display:flex;flex-direction:column;gap:10px'>
					<p class='text-white'>Average Pace: ${data.averagePace}</p>
					<p class='text-white'>Fastest Pace: ${data.fastestPace}</p>
				</div>
				
			</div>
			`
		})
	})
}
fastestRunners()