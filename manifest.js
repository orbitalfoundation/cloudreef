// @todo hmmm i need some concept of local resources...
let path = new URL(import.meta.url).pathname
path = path.slice(0,path.lastIndexOf("/"))



///
/// client side manifest
///

const metadata = {
	metadata: {
		name: 'orbital cloudreef',
		version: '0.0.1',
		license: 'MIT',
		contributors: [
			{
				name: 'Anselm Hook',
				email:'anselm@orbital.foundation'
			}
		],
		repository: 'github:orbital.foundation',
		funding: {
			type: 'patreon',
			url: 'https://www.patreon.com/orbital-foundation'
		},
		homepage: 'https://orbital.foundation/cloudreef',
		bugs: 'https://github.com/orbital.foundation',
		description: 'a coral reef simulation',
		keywords: [ 'reef', 'simulation','wilderness'],

		publickey: 0x1234123, // public key of author tbd
		signature: 0x1241234, // signature of author tbd
		write: [ 0x12341234 ] // a list of individuals that have permission to write to this folder; and or a list of other rooms as a way to do acls
	}
}

const dependencies = {
	dependencies: [
		'@orbital/paper/paper.js',
		'@orbital/volume-babylon3d/volume-babylon3d.js',
		'@orbital/net/network.js',
		path+'/scripts/swim.mjs'
	]
}

const volume1 = {
	volume: 'volume1',
	name:'volume1',
	uuid:'cloudreef/volume1',
	surface: true
}

const camera1 = {
	volume: 'volume1',
	name:"camera1",
	uuid:'cloudreef/camera1',
	transform:{
		xyz:[0,2,5],
		lookat:[0,0,0]
	},
	camera:{}
}

const light1 = {
	volume: 'volume1',
	name:'light1',
	uuid:'cloudreef/light1',
	transform:{
		xyz:[10,10,10],
		lookat:[0,0,0]
	},
	light:{
		type:'directional',
		intensity:2.5
	}
}

const light2 = {
	volume: 'volume1',
	name:'light2',
	uuid:'cloudreef/light2',
	light:{
		type:'ambient'
	}
}

const ground1 = {
	volume: 'volume1',
	name:'ground1',
	uuid:'cloudreef/ground1',
	transform: {
		xyz:[0,-0.1,0],
		ypr:[0,0,0],
		whd:[3,0.1,3],
	},
	geometry: 'box',
	material: {
		receivesShadows: true,
		alpha: 0.5,
		heightmap: './art/heightMap.png',
		art: './art/heightMap.png',
	},
}

const avatar1 = {
	name: 'avatar1-[UUID]',
	name: 'avatar1',
	volume: 'volume1',
	uuid:'cloudreef/avatar1',
	transform:{
		whd:[1,1,1],
		xyz:[0,1,0],
		xyzd:[0,1,0],
		ypr:[0,0,0],
		yprd:[0,0,0],
		adjust:{xyz:[0,-0.5,0],ypr:[0,1.9,0]},
	},
	geometry:'./art/diver/',
	swim: true,
	network: true
}

const reef1 = {
	volume: 'volume1',
	name:'reef1',
	uuid:'cloudreef/reef1',
	credits: `'Coral reef small' (https://skfb.ly/6RPFV) by Miguelangelo Rosario is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
	geometry:'./art/coral-reef-small.glb', // @todo the basepath should be relative to the project not include it??? debate
	transform:{
		//whd:[0.01,0.01,0.01],
		//xyz:[0,1,0],
		//xyzd:[0,1,0],
		ypr:[0,-5,0],
		//yprd:[0,0,0],
		//adjust:{xyz:[0,-0.5,0],ypr:[0,1.9,0]},
	},
}

const website1 = {
	paper:true,
	name:'website1',
	uuid:'cloudreef/website1',
	name:'volume1', // must have a name or uuid to be visible to the query engine for the router to pick it up and paint it
	id:'volume1', // this id will be written into the dom and then picked up as the rendering context for the 3d view
	css:`margin:0;padding:0;height:100%;width:100%;position:absolute;left:0;top:0`,
	content:`<div style="position:absolute;left:8;top:0;">
		<div style="font-size:2em;display:flex;justify-content:left;align-items:center">
			<a extern=true href="/" style='font-size:2em;margin-top:-8px;color:#e0e0e0;text-decoration:none'>⚈</a>
			<!--<div>&nbsp;</div><div style="color:white">Orbital</div> -->
		</div>
	</div>`
}

const content = [
	website1,
	volume1,
	camera1,
	light1,
	light2,
	ground1,
	avatar1,
	reef1,
]

// throw this datagram to the server to order it to send a fresh copy of local state in this path

const fresh_copy_request = {
	about:'ask server for a fresh copy of state',
	network:true,
	server_query:{}
}

// export everything in this specific order - although raw exports per item could be done instead the overall order is not preserved

export let manifest = [
	metadata,
	dependencies,
	content,
	fresh_copy_request,
]
