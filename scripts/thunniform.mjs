
import "orbital/volume-babylon3d/libs/babylon.js"

function thunniform(entity,sys) {

	if(!entity.transform || !entity.transform.xyz || !entity.transform.ypr) {
		console.error("volume: thuniform corrupt in entity",entity)
		return
	}

	const xyz = entity.transform.xyz
	const ypr = entity.transform.ypr

	ypr[1] += 0.005
	let m = 0.01

	// get current orientation as euler and use to estimate translation target
	let rot = BABYLON.Quaternion.FromEulerAngles(...ypr)
	let vec = new BABYLON.Vector3(0,0,m).rotateByQuaternionToRef(rot,BABYLON.Vector3.Zero())

	// translate as a function of direction
	xyz[0] += vec.x
	xyz[1] += vec.y
	xyz[2] += vec.z

	// @todo it is a bit hacky to touch the props in the right way - could improve this a lot

	const blob = {
		uuid:entity.uuid,
	}

	if(entity.network) blob.network = entity.network
	if(entity.volume) blob.volume = entity.volume
	if(entity.network) blob.network = entity.network
	if(entity.transform) {
		entity.transform.ypr = ypr
		entity.transform.xyz = xyz
		blob.transform = entity.transform
	}

	// i don't see any point in awaiting; so just fire it off 
	sys.resolve(blob)
}

async function observer(args) {
	if(!args || !args.sys || !args.sys.server) return
	if(args.blob.name !== 'tick') return
	const results = await args.sys.query({thunniform:true})

	results.forEach( entity => thunniform(entity,args.sys) )
	return true
}

export const thunniform_observer = {
	about: "thunniform swimmer",
	observer
}
