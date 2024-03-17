
///
/// server side 'sys' bootstrap
///

import { Sys } from 'orbital/sys/sys.js'
import { server_create_uuid } from 'orbital/sys/uuid.js'

const config = {
	systemid: server_create_uuid(),
	server: (typeof window === 'undefined') ? true : false,
	host: "orbital.foundation",
	port: 4000,
	importmaps: {
		'anchor':import.meta.dirname,
		'orbital':`${import.meta.dirname}/node_modules/orbital`
	}
}

const sys = new Sys(config)

//
// server side manifest (as a test)
//

const modules = [
	'orbital/net/network.js',
	'/scripts/thunniform.mjs'
]

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

await sys.resolve({modules})
await sys.resolve(shark1)

//
// run forever
//

sys.run()
