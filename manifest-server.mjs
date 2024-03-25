
const dependencies = {
	dependencies: [
		'@orbital/net/network.js',
		'/scripts/thunniform.mjs'
	]
}

const shark1 = {
	name: 'shark1',
	about: 'server shark',
	volume: "volume1",
	uuid: "cloudreef/shark1",
	geometry:'/art/white_pointer.glb',
	transform:{
		whd:[0.01,0.01,0.01],
		xyz:[0,1,0],
		//xyzd:[0,1,0],
		ypr:[0,1,0],
		//yprd:[0,0,0],
		//adjust:{xyz:[0,-0.5,0],ypr:[0,1.9,0]},
	},
	thunniform:true,
	network:true
}

export const manifest = [ dependencies, shark1 ]

