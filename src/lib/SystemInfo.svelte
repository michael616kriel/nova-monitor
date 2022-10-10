<script>
	import { Grid, Row, Column, DataTable } from 'carbon-components-svelte';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	export let data;

	// Disks
	let diskInfoHeaders = [
		{ key: 'name', value: 'Name' },
		{ key: 'device', value: 'Device' },
		{ key: 'interfaceType', value: 'Interface' },
		{ key: 'type', value: 'Type' },
		{ key: 'size', value: 'Size' }
	];
	let diskLayoutRows = [];

	let diskSpaceHeaders = [
		{ key: 'fs', value: 'Fs' },
		{ key: 'type', value: 'Type' },
		{ key: 'mount', value: 'Mount' },
		{ key: 'size', value: 'Size' },
		{ key: 'used', value: 'Used' }
	];
	let diskSpaceRows = [];

	// Network
	let networkInterfacesHeaders = [
		{ key: 'ip4', value: 'IP4' },
		{ key: 'ip4subnet', value: 'Ip4 Subnet' },
		{ key: 'ip6', value: 'IP6' },
		{ key: 'mac', value: 'Mac' },
		{ key: 'type', value: 'Type' },
		{ key: 'iface', value: 'Iface' },
		{ key: 'ifaceName', value: 'Iface Name' }
	];
	let networkInterfacesRows = [];

	// Network Connection
	let networkConnectionsHeaders = [
		{ key: 'localAddress', value: 'Local Address' },
		{ key: 'localPort', value: 'Local Port' },
		{ key: 'peerAddress', value: 'Peer Address' },
		{ key: 'protocol', value: 'Protocol' },
		{ key: 'state', value: 'State' }
	];
	let networkConnectionsRows = [];

	// GPU
	let gpuHeaders = [
		{ key: 'bus', value: 'Bus' },
		{ key: 'busAddress', value: 'Bus Address' },
		{ key: 'model', value: 'Model' },
		{ key: 'vram', value: 'VRam' },
		{ key: 'vendor', value: 'Vendor' }
	];
	let gpuRows = [];

	// Displays
	let displaysHeaders = [
		{ key: 'connection', value: 'Connection' },
		{ key: 'main', value: 'Main' },
		{ key: 'resolution', value: 'Resolution' },
		{ key: 'currentRefreshRate', value: 'Refresh Rate' }
	];
	let displaysRows = [];

	// Memory
	let memoryHeaders = [
		{ key: 'size', value: 'Size' },
		{ key: 'clockSpeed', value: 'Clock Speed' }
	];
	let memoryRows = [];

	// USB
	let usbHeaders = [
		{ key: 'usbId', value: 'Id' },
		{ key: 'name', value: 'name' },
		{ key: 'maxPower', value: 'Max Power' },
		{ key: 'bus', value: 'Bus' },
		{ key: 'type', value: 'Type' },
		{ key: 'deviceId', value: 'Device Id' }
	];
	let usbRows = [];

	// Audio
	let audioHeaders = [
		{ key: 'name', value: 'name' },
		{ key: 'manufacturer', value: 'Manufacturer' },
		{ key: 'driver', value: 'Driver' },
		{ key: 'status', value: 'Status' },
		{ key: 'channel', value: 'Channel' }
	];
	let audioRows = [];

	let system = {
		osInfo: {
			arch: '',
			codename: '',
			distro: '',
			hostname: '',
			kernel: '',
			platform: '',
			release: ''
		},
		cpus: {
			brand: '',
			cores: 0,
			manufacturer: '',
			vendor: '',
			speed: 0,
			speedMax: 0,
			speedMin: 0,
			physicalCores: 0
		}
	};

	const fetchSystemInfo = (serverData) => {
		const {
			diskLayout,
			networkInterfaces,
			graphics,
			memory,
			usb,
			networkConnections,
			audio,
			fsSize,
			...systemData
		} = serverData;

		diskLayoutRows = diskLayout.map((disk, index) => {
			return {
				id: index,
				...disk,
				size: `${Math.round(disk.size / 1000000000)} Gb`
			};
		});

		diskSpaceRows = fsSize.map((disk, index) => {
			return {
				id: index,
				...disk,
				size: `${Math.round(disk.size / 100000000)} Mb`,
				used: `${Math.round(disk.size / 100000000)} Mb`
			};
		});

		networkInterfacesRows = networkInterfaces.map((networkInterface, index) => {
			return {
				id: index,
				...networkInterface
			};
		});

		networkConnectionsRows = networkConnections.map((networkInterface, index) => {
			return {
				id: index,
				...networkInterface
			};
		});

		gpuRows = graphics.controllers.map((gpu, index) => {
			return {
				id: index,
				...gpu
			};
		});

		displaysRows = graphics.displays.map((display, index) => {
			return {
				id: index,
				...display,
				resolution: `${display.currentResX}x${display.currentResY}`,
				currentRefreshRate: `${display.currentRefreshRate} Ghz`
			};
		});

		memoryRows = memory.map((mem, index) => {
			return {
				id: index,
				...mem,
				size: `${Math.round(mem.size / 1000000000)} Gb`
			};
		});

		usbRows = usb.map((usbItem, index) => {
			return {
				...usbItem,
				id: index,
				usbId: usbItem.id
			};
		});

		audioRows = audio.map((audioItem, index) => {
			return {
				...audioItem,
				id: index
			};
		});

		system = systemData;
	};

	fetchSystemInfo(data);
</script>

<Grid>
	<Row>
		<Column>
			<Tabs>
				<Tab label="System" />
				<Tab label="Disk" />
				<Tab label="USB" />
				<Tab label="Audio" />
				<Tab label="Network" />
				<svelte:fragment slot="content">
					<TabContent>
						<Grid noGutter>
							<Row>
								<Column lg={5}>
									<h4>System Info</h4>
									<br />
									<p><strong>Arch: </strong>{system.osInfo.arch}</p>
									<p><strong>Codename: </strong>{system.osInfo.codename}</p>
									<p><strong>Distro: </strong>{system.osInfo.distro}</p>
									<p><strong>Hostname: </strong>{system.osInfo.hostname}</p>
									<p><strong>Kernel: </strong>{system.osInfo.kernel}</p>
									<p><strong>Platform: </strong>{system.osInfo.platform}</p>
									<p><strong>Release: </strong>{system.osInfo.release}</p>
								</Column>
								<Column lg={5}>
									<h4>CPU</h4>
									<br />
									<p><strong>Brand: </strong>{system.cpus.brand}</p>
									<p><strong>Cores: </strong>{system.cpus.cores}</p>
									<p><strong>Physical Cores: </strong>{system.cpus.physicalCores}</p>
									<p><strong>Manufacturer: </strong>{system.cpus.manufacturer}</p>
									<p><strong>Vendor: </strong>{system.cpus.vendor}</p>
									<p><strong>Speed: </strong>{system.cpus.speed} Ghz</p>
									<p><strong>SpeedMax: </strong>{system.cpus.speedMax} Ghz</p>
									<p><strong>SpeedMin: </strong>{system.cpus.speedMin} Ghz</p>
								</Column>
							</Row>
						</Grid>
						<h4>Memory</h4>
						<br />
						<DataTable headers={memoryHeaders} rows={memoryRows} />
						<br /><br />
						<h4>GPUs</h4>
						<br />
						<DataTable headers={gpuHeaders} rows={gpuRows} />
						<br /><br />
						<h4>Displays</h4>
						<br />
						<DataTable headers={displaysHeaders} rows={displaysRows} />
						<br /><br />
					</TabContent>
					<TabContent>
						<h4>Layout</h4>
						<br />
						<DataTable headers={diskInfoHeaders} rows={diskLayoutRows} />
						<br /><br />
						<h4>Space</h4>
						<br />
						<DataTable headers={diskSpaceHeaders} rows={diskSpaceRows} />
						<br /><br />
					</TabContent>
					<TabContent>
						<h4>Devices</h4>
						<br />
						<DataTable headers={usbHeaders} rows={usbRows} />
						<br /><br />
					</TabContent>
					<TabContent>
						<h4>Devices</h4>
						<br />
						<DataTable headers={audioHeaders} rows={audioRows} />
						<br /><br />
					</TabContent>
					<TabContent>
						<h4>Interfaces</h4>
						<br />
						<DataTable headers={networkInterfacesHeaders} rows={networkInterfacesRows} />
						<br /><br />
						<h4>Connections</h4>
						<br />
						<DataTable headers={networkConnectionsHeaders} rows={networkConnectionsRows} />
						<br /><br /></TabContent
					>
				</svelte:fragment>
			</Tabs>
		</Column>
	</Row>
</Grid>
