import si from 'systeminformation';

export async function load() {
	const [
		memory,
		cpus,
		networkInterfaces,
		networkConnections,
		graphics,
		diskLayout,
		fsSize,
		osInfo,
		usb,
		audio
	] = await Promise.all([
		si.memLayout(),
		si.cpu(),
		si.networkInterfaces(),
		si.networkConnections(),
		si.graphics(),
		si.diskLayout(),
		si.fsSize(),
		si.osInfo(),
		si.usb(),
		si.audio()
	]);
	const systemInfo = {
		networkInterfaces,
		networkConnections,
		cpus,
		memory,
		graphics,
		diskLayout,
		fsSize,
		osInfo,
		usb,
		audio
	};
	return systemInfo;
}
