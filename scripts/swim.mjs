
// @todo i need a way to resolve importmaps on the client side better... or maybe i have to alias @orbital locally?
import "/node_modules/orbital/volume-babylon3d/libs/babylon.js"

function swim(event,entity,sys) {

	if(!entity.transform || !entity.transform.xyz || !entity.transform.ypr) {
		console.error("swim: error in entity",entity)
		return
	}

	const xyz = entity.transform.xyz || [ 0,0,0 ]
	const ypr = entity.transform.ypr || [ 0,0,0 ]

	let m = 0
	switch(event.key) {
		case 'a': ypr[1] -=0.1; break
		case 'd': ypr[1] +=0.1; break
		case 's': m = -0.1; break
		case 'w': m = 0.1; break
		case 'r': break
		default: return
	}

	// get current orientation as euler and use to estimate translation target
	let rot = BABYLON.Quaternion.FromEulerAngles(...ypr)
	let vec = new BABYLON.Vector3(0,0,m).rotateByQuaternionToRef(rot,BABYLON.Vector3.Zero())

	// translate as a function of direction
	xyz[0] += vec.x
	xyz[1] += vec.y
	xyz[2] += vec.z

	// force local default camera behind swimmer
	// @todo we have to figure out how to get at the current volume only!
	if(window.volume && window.volume) {
		const vec = new BABYLON.Vector3(0,2,-5).rotateByQuaternionToRef(rot,BABYLON.Vector3.Zero())
		vec.x += xyz[0]
		vec.y += xyz[1]
		vec.z += xyz[2]
		let lookat = [ xyz[0], xyz[1], xyz[2] ]
		window.volume.update_camera(vec,new BABYLON.Vector3(...lookat))
	}

	entity.transform.xyz = xyz
	entity.transform.ypr = ypr
	const blob = {
		uuid:entity.uuid,
		transform:entity.transform
	}

	// i don't see any point in awaiting; so just fire it off 
	sys.resolve(blob)
}

function observer(args) {
	if(!args || !args.entity || !args.fresh || !args.entity.swim || args.entity.network_remote) return false
	if (typeof window === 'undefined' || document === 'undefined') {
		console.error("swimming: should not be run on server")
		return false
	}
	console.log("thunniform: registering a handler once")
	document.addEventListener('keydown',(event) => {
		swim(event,args.entity,args.sys)
	})
	// slight hack; force an earlier reaction to the entity since it is 'pure'
	swim({key:'r'},args.entity,args.sys)
	return true
}

export const swim_observer = {
	about: 'swim component',
	observer
}
