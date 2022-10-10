import si from 'systeminformation';

export async function load() {
	const currentLoad = await si.currentLoad();
	const processes = await si.processes();
	return {
        currentLoad,
        processes
    };
}
